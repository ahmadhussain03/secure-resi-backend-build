"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentPanicAlertRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentPanicAlertRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class ResidentPanicAlertsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const alerts = await ResidentPanicAlertRepositoryContract_1.default.allByProject(request, project);
        return response.json(alerts);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const id = params.id;
        const alert = await ResidentPanicAlertRepositoryContract_1.default.findByIdByProject(id, project);
        return response.json(alert);
    }
    async update({ request, response, auth, params }) {
        const alertCommentSchema = Validator_1.schema.create({
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            audio: Validator_1.schema.file.optional({ size: '128mb' }),
            comment: Validator_1.schema.string.optional({ trim: true }),
        });
        const data = await request.validate({ schema: alertCommentSchema });
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        data.userId = authUser.id;
        const alert = await ResidentPanicAlertRepositoryContract_1.default.findByIdByProjectAndUpdate(params.id, project, data, request);
        return response.json(alert);
    }
}
exports.default = ResidentPanicAlertsController;
//# sourceMappingURL=ResidentPanicAlertsController.js.map