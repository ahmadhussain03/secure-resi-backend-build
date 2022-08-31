"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GateTerminalRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GateTerminalRepositoryContract"));
const CreateGateTerminalValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGateTerminalValidator"));
const UpdateGateTerminalValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateGateTerminalValidator"));
class GateTerminalsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const gateTerminals = await GateTerminalRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(gateTerminals);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateGateTerminalValidator_1.default);
        data.projectId = projectId;
        const gatePassType = await GateTerminalRepositoryContract_1.default.create(data);
        return response.json(gatePassType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateGateTerminalValidator_1.default);
        const authUser = auth.user;
        const gateTerminal = await GateTerminalRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(gateTerminal);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const gateTerminal = await GateTerminalRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(gateTerminal);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await GateTerminalRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Gate Terminal Deleted Successfully" });
    }
}
exports.default = GateTerminalsController;
//# sourceMappingURL=GateTerminalsController.js.map