"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolScheduleRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PatrolScheduleRepositoryContract"));
const CreatePatrolScheduleValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreatePatrolScheduleValidator"));
const UpdatePatrolScheduleValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdatePatrolScheduleValidator"));
class PatrolSchedulesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedules = await PatrolScheduleRepositoryContract_1.default.all(request, project);
        return response.json(schedules);
    }
    async list({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedules = await PatrolScheduleRepositoryContract_1.default.list(request, project, authUser.id);
        return response.json(schedules);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(CreatePatrolScheduleValidator_1.default);
        data.userId = authUser.id;
        data.projectId = project.id;
        const schedule = await PatrolScheduleRepositoryContract_1.default.create(data);
        return response.json(schedule);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedule = await PatrolScheduleRepositoryContract_1.default.findById(params.id, project);
        return response.json(schedule);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(UpdatePatrolScheduleValidator_1.default);
        const schedule = await PatrolScheduleRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(schedule);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        await PatrolScheduleRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: 'Schedule Deleted Successfully!' });
    }
}
exports.default = PatrolSchedulesController;
//# sourceMappingURL=PatrolSchedulesController.js.map