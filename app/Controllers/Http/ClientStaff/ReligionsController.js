"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReligionRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ReligionRepositoryContract"));
const CreateReligionValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateReligionValidator"));
const UpdateReligionValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateReligionValidator"));
class ReligionsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const religions = await ReligionRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(religions);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateReligionValidator_1.default);
        data.projectId = projectId;
        const religion = await ReligionRepositoryContract_1.default.create(data);
        return response.json(religion);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateReligionValidator_1.default);
        const authUser = auth.user;
        const religion = await ReligionRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(religion);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const religion = await ReligionRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(religion);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await ReligionRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Religion Deleted Successfully" });
    }
}
exports.default = ReligionsController;
//# sourceMappingURL=ReligionsController.js.map