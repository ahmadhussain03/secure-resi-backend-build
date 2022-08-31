"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GateTerminalRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GateTerminalRepositoryContract"));
class GateTerminalsController {
    async index({ response, request }) {
        const qs = request.qs();
        if (!qs.project) {
            return response.json([]);
        }
        const gateTerminals = await GateTerminalRepositoryContract_1.default.allByProjectCode(request, qs.project);
        return response.json(gateTerminals);
    }
}
exports.default = GateTerminalsController;
//# sourceMappingURL=GateTerminalsController.js.map