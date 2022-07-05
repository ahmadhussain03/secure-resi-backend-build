"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OperationTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/OperationTypeRepositoryContract"));
class OperationTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const logTypes = await OperationTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(logTypes);
    }
}
exports.default = OperationTypesController;
//# sourceMappingURL=OperationTypesController.js.map