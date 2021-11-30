"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StaffNotificationRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/StaffNotificationRepositoryContract"));
const CreateStaffNotificationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateStaffNotificationValidator"));
const UpdateStaffNotificationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateStaffNotificationValidator"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Fcm_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Fcm"));
class StaffNotificationsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const notifications = await StaffNotificationRepositoryContract_1.default.allByProjectId(projectId, request);
        return response.json(notifications);
    }
    async store({ request, response, auth }) {
        const data = await request.validate(CreateStaffNotificationValidator_1.default);
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        data.user_id = authUser.id;
        data.project_id = projectId;
        data.recipient_id = data.recipient_id;
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('staff_notification/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const notification = await StaffNotificationRepositoryContract_1.default.create(data);
        let users = [];
        if (notification.recipientId) {
            users = await User_1.default.query().whereNotNull('device_token')
                .whereHas('resident', (query) => {
                query.where('project_id', projectId);
            })
                .orWhereHas('clientStaff', (query) => {
                query.where('project_id', projectId);
            })
                .whereHas('role', (query) => {
                query.where('name', notification.recipientId);
            });
        }
        else {
            users = await User_1.default.query().whereNotNull('device_token').whereHas('clientStaff', (query) => {
                query.where('project_id', projectId);
            }).orWhereHas('resident', (query) => {
                query.where('project_id', projectId);
            });
        }
        users.forEach(async (user) => {
            await Fcm_1.default.sendNotification(user.deviceToken, {
                payload: {
                    notification: {
                        title: 'Premises Notification',
                        body: notification.subject
                    },
                    data: {
                        type: 'premises_notification'
                    }
                },
            });
        });
        return response.json(notification);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateStaffNotificationValidator_1.default);
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('staff_notification/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const notification = await StaffNotificationRepositoryContract_1.default.findByIdAndUpdate(data, params.id, projectId);
        return response.json(notification);
    }
    async destroy({ response, params, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        await StaffNotificationRepositoryContract_1.default.findByIdAndProjectAndDelete(params.id, projectId);
        return response.json({ message: 'Notification Deleted Successfully!' });
    }
}
exports.default = StaffNotificationsController;
//# sourceMappingURL=StaffNotificationsController.js.map