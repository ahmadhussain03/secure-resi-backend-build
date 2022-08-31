"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GatePassRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GatePassRepositoryContract"));
const CreateGatePassValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGatePassValidator"));
const UpdateGatePassValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateGatePassValidator"));
class GatePassesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const gatePasses = await GatePassRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(gatePasses);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateGatePassValidator_1.default);
        data.projectId = projectId;
        const gatePass = await GatePassRepositoryContract_1.default.create(data);
        return response.json(gatePass);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateGatePassValidator_1.default);
        const authUser = auth.user;
        const gatePass = await GatePassRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(gatePass);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const gatePass = await GatePassRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(gatePass);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await GatePassRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Gate Pass Deleted Successfully" });
    }
}
exports.default = GatePassesController;
//# sourceMappingURL=GatePassesController.js.map