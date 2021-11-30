"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlockRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/BlockRepositoryContract"));
const LevelRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LevelRepositoryContract"));
const CreateLevelValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateLevelValidator"));
const UpdateLevelValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateLevelValidator"));
class LevelsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const levels = await LevelRepositoryContract_1.default.all(request, project);
        return response.json(levels);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const level = await LevelRepositoryContract_1.default.findById(params.id, project);
        return response.json(level);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateLevelValidator_1.default);
        await BlockRepositoryContract_1.default.findById(data.blockId, project);
        data.projectId = project.id;
        const level = await LevelRepositoryContract_1.default.create(data);
        return response.json(level);
    }
    async update({ response, request, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(UpdateLevelValidator_1.default);
        if (data.blockId)
            await BlockRepositoryContract_1.default.findById(data.blockId, project);
        const block = await LevelRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(block);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await LevelRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: "Level Deleted Successfully" });
    }
}
exports.default = LevelsController;
//# sourceMappingURL=LevelsController.js.map