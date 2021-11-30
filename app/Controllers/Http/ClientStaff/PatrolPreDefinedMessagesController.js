"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolPreDefinedRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PatrolPreDefinedRepositoryContract"));
const CreatePatrolPreDefinedMessageValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreatePatrolPreDefinedMessageValidator"));
const UpdatePatrolPreDefinedMessageValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdatePatrolPreDefinedMessageValidator"));
class PatrolPreDefinedMessagesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const messages = await PatrolPreDefinedRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(messages);
    }
    async store({ request, response, auth }) {
        const data = await request.validate(CreatePatrolPreDefinedMessageValidator_1.default);
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        data.projectId = projectId;
        const message = await PatrolPreDefinedRepositoryContract_1.default.create(data);
        return response.json(message);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdatePatrolPreDefinedMessageValidator_1.default);
        const authUser = auth.user;
        const message = await PatrolPreDefinedRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(message);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const message = await PatrolPreDefinedRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(message);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await PatrolPreDefinedRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Patrol Pre Defined Message Deleted Successfully" });
    }
}
exports.default = PatrolPreDefinedMessagesController;
//# sourceMappingURL=PatrolPreDefinedMessagesController.js.map