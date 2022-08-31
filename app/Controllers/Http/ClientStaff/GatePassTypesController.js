"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatePassTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GatePassTypeRepositoryContract"));
const CreateGatePassTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGatePassTypeValidator"));
const UpdateGatePassTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateGatePassTypeValidator"));
class GatePassTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const gatePassTypes = await GatePassTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(gatePassTypes);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateGatePassTypeValidator_1.default);
        data.projectId = projectId;
        const gatePassType = await GatePassTypeRepositoryContract_1.default.create(data);
        return response.json(gatePassType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateGatePassTypeValidator_1.default);
        const authUser = auth.user;
        const gatePassType = await GatePassTypeRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(gatePassType);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const gatePassType = await GatePassTypeRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(gatePassType);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await GatePassTypeRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Gate Pass Type Deleted Successfully" });
    }
}
exports.default = GatePassTypesController;
//# sourceMappingURL=GatePassTypesController.js.map