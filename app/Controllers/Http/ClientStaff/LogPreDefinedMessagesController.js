"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogPreDefinedRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LogPreDefinedRepositoryContract"));
const CreateLogPreDefinedMessageValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateLogPreDefinedMessageValidator"));
const UpdateLogPreDefinedMessageValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateLogPreDefinedMessageValidator"));
class LogPreDefinedMessagesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const messages = await LogPreDefinedRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(messages);
    }
    async store({ request, response, auth }) {
        const data = await request.validate(CreateLogPreDefinedMessageValidator_1.default);
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        data.projectId = projectId;
        const message = await LogPreDefinedRepositoryContract_1.default.create(data);
        return response.json(message);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateLogPreDefinedMessageValidator_1.default);
        const authUser = auth.user;
        const message = await LogPreDefinedRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(message);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const message = await LogPreDefinedRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(message);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await LogPreDefinedRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Log Pre Defined Message Deleted Successfully" });
    }
}
exports.default = LogPreDefinedMessagesController;
//# sourceMappingURL=LogPreDefinedMessagesController.js.map