"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LogTypeRepositoryContract"));
const CreateLogTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateLogTypeValidator"));
const UpdateLogTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateLogTypeValidator"));
class LogTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const logTypes = await LogTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(logTypes);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateLogTypeValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const logType = await LogTypeRepositoryContract_1.default.create(data);
        return response.json(logType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateLogTypeValidator_1.default);
        const authUser = auth.user;
        const logType = await LogTypeRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(logType);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const logType = await LogTypeRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(logType);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await LogTypeRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Log Type Deleted Successfully" });
    }
}
exports.default = LogTypesController;
//# sourceMappingURL=LogTypesController.js.map