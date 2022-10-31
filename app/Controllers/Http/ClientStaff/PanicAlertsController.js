"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PanicAlertRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PanicAlertRepositoryContract"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Fcm_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Fcm"));
const WebSocket_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/WebSocket"));
class PanicAlertsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const alert = await PanicAlertRepositoryContract_1.default.all(request, project);
        return response.json(alert);
    }
    async report({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const alert = await PanicAlertRepositoryContract_1.default.allPaginated(request, project);
        return response.json(alert);
    }
    async store({ response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = { userId: authUser?.id, projectId: project.id };
        const alert = await PanicAlertRepositoryContract_1.default.create(data);
        WebSocket_1.default.io.emit(`panic-alert:created:${project.id}`, alert);
        const guards = await User_1.default.query().select(['id', 'device_token']).whereNotNull('device_token').whereHas('clientStaff', (query) => {
            query.where('project_id', project.id);
        }).whereHas('role', (query) => {
            query.where('name', 'guard');
        }).preload('clientStaff');
        const deviceIds = guards.map(guard => guard.deviceToken);
        if (deviceIds.length) {
            Fcm_1.default.sendNotifications(deviceIds, {
                payload: {
                    notification: {
                        title: 'Panic Alert',
                        body: `${authUser?.username} has generated a panic alert`
                    },
                    data: {
                        type: 'panic_alert'
                    }
                }
            });
        }
        return response.json(alert);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await PanicAlertRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: 'Panic Alert Deleted Successfully!' });
    }
}
exports.default = PanicAlertsController;
//# sourceMappingURL=PanicAlertsController.js.map