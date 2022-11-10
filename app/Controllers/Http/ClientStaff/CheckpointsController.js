"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckpointRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/CheckpointRepositoryContract"));
const CreateCheckpointValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateCheckpointValidator"));
const UpdateCheckpointValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateCheckpointValidator"));
class CheckpointsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const checkpoints = await CheckpointRepositoryContract_1.default.all(request, project);
        return response.json(checkpoints);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(CreateCheckpointValidator_1.default);
        data.userId = authUser.id;
        data.projectId = project.id;
        data.code = 'chk-' + project.id;
        const checkpoint = await CheckpointRepositoryContract_1.default.create(data, project);
        return response.json(checkpoint);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(UpdateCheckpointValidator_1.default);
        const checkpoint = await CheckpointRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(checkpoint);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const checkpoint = await CheckpointRepositoryContract_1.default.findByIdAll(params.id, project);
        return response.json(checkpoint);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        await CheckpointRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: 'Checkpoint Deleted Successfully!' });
    }
}
exports.default = CheckpointsController;
//# sourceMappingURL=CheckpointsController.js.map