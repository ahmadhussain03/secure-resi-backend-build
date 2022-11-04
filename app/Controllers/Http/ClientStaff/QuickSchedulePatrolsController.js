"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSchedulePatrolRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/QuickSchedulePatrolRepositoryContract"));
const QuickSchedulePatrol_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/QuickSchedulePatrol"));
const CreateQuickSchedulePatrolValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateQuickSchedulePatrolValidator"));
const UpdateQuickSchedulePatrolValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateQuickSchedulePatrolValidator"));
class QuickSchedulePatrolsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedules = await QuickSchedulePatrolRepositoryContract_1.default.all(request, project);
        return response.json(schedules);
    }
    async list({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedules = await QuickSchedulePatrolRepositoryContract_1.default.all(request, project);
        return response.json(schedules);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(CreateQuickSchedulePatrolValidator_1.default);
        data.userId = authUser.id;
        data.projectId = project.id;
        const quickSchedulePatrol = await QuickSchedulePatrolRepositoryContract_1.default.create(data);
        return response.json(quickSchedulePatrol);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(UpdateQuickSchedulePatrolValidator_1.default);
        const quickSchedulePatrolObj = await QuickSchedulePatrol_1.default.query().where('id', params.id).where('project_id', project.id).firstOrFail();
        const quickSchedulePatrol = await QuickSchedulePatrolRepositoryContract_1.default.update(data, quickSchedulePatrolObj);
        return response.json(quickSchedulePatrol);
    }
}
exports.default = QuickSchedulePatrolsController;
//# sourceMappingURL=QuickSchedulePatrolsController.js.map