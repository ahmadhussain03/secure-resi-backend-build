"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImprovementTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ImprovementTypeRepositoryContract"));
const CreateImprovementTypeValidator_1 = __importDefault(require("./../../../Validators/ClientStaff/CreateImprovementTypeValidator"));
const UpdateImprovementTypeValidator_1 = __importDefault(require("./../../../Validators/ClientStaff/UpdateImprovementTypeValidator"));
class ImprovementTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const improvementTypes = await ImprovementTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(improvementTypes);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateImprovementTypeValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const operationType = await ImprovementTypeRepositoryContract_1.default.create(data);
        return response.json(operationType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateImprovementTypeValidator_1.default);
        const authUser = auth.user;
        const operationType = await ImprovementTypeRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(operationType);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const operationType = await ImprovementTypeRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(operationType);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await ImprovementTypeRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Improvement Type Deleted Successfully" });
    }
}
exports.default = ImprovementTypesController;
//# sourceMappingURL=ImprovementTypesController.js.map