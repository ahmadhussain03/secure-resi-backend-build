"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlockRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/BlockRepositoryContract"));
const CreateBlockValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateBlockValidator"));
const UpdateBlockValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateBlockValidator"));
class BlocksController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const blocks = await BlockRepositoryContract_1.default.all(request, project);
        return response.json(blocks);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const block = await BlockRepositoryContract_1.default.findById(params.id, project);
        return response.json(block);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateBlockValidator_1.default);
        data.projectId = project.id;
        const block = await BlockRepositoryContract_1.default.create(data);
        return response.json(block);
    }
    async update({ response, request, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(UpdateBlockValidator_1.default);
        const block = await BlockRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(block);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await BlockRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: "Block Deleted Successfully" });
    }
}
exports.default = BlocksController;
//# sourceMappingURL=BlocksController.js.map