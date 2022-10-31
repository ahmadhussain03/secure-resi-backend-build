"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuardOperationRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GuardOperationRepositoryContract"));
const CreateGuardOperationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGuardOperationValidator"));
const UpdateGuardOperationValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateGuardOperationValidator"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
class GuardOperationsController {
    async index({ request, response, auth }) {
        const project = auth.user?.clientStaff.project;
        const operations = await GuardOperationRepositoryContract_1.default.all(request, project);
        return response.json(operations);
    }
    async report({ request, response, auth }) {
        const project = auth.user?.clientStaff.project;
        const operations = await GuardOperationRepositoryContract_1.default.allPaginated(request, project);
        return response.json(operations);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const data = await request.validate(CreateGuardOperationValidator_1.default);
        data.projectId = projectId;
        data.userId = authUser.id;
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('guard_operation/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        if (audio) {
            const fileName = `${(0, Helpers_1.cuid)()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath('guard_operation/audio'), {
                name: fileName
            });
            data.audio = fileName;
        }
        const operation = await GuardOperationRepositoryContract_1.default.create(data);
        return response.json(operation);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(UpdateGuardOperationValidator_1.default);
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('guard_operation/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        if (audio) {
            const fileName = `${(0, Helpers_1.cuid)()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath('guard_operation/audio'), {
                name: fileName
            });
            data.audio = fileName;
        }
        const operation = await GuardOperationRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(operation);
    }
    async destroy({ response, params, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        await GuardOperationRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: 'Guard Operation Deleted Successfully' });
    }
}
exports.default = GuardOperationsController;
//# sourceMappingURL=GuardOperationsController.js.map