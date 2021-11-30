"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ImprovementTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ImprovementTypeRepositoryContract"));
class ImprovementTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const improvementTypes = await ImprovementTypeRepositoryContract_1.default.all(request, authUser.resident.project);
        return response.json(improvementTypes);
    }
}
exports.default = ImprovementTypesController;
//# sourceMappingURL=ImprovementTypesController.js.map