"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoAccountRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/MoAccountRepositoryContract"));
const CreateMoAccountValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateMoAccountValidator"));
const UpdateMoAccountValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateMoAccountValidator"));
class MoAccountsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const moAccount = await MoAccountRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(moAccount);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateMoAccountValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const moAccount = await MoAccountRepositoryContract_1.default.create(data);
        return response.json(moAccount);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateMoAccountValidator_1.default);
        const authUser = auth.user;
        const moAccount = await MoAccountRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(moAccount);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const moAccount = await MoAccountRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(moAccount);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await MoAccountRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Mo Account Deleted Successfully" });
    }
}
exports.default = MoAccountsController;
//# sourceMappingURL=MoAccountsController.js.map