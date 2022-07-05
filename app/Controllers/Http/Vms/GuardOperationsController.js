"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuardOperationRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GuardOperationRepositoryContract"));
class GuardOperationsController {
    async index({ request, response, auth }) {
        const project = auth.user?.clientStaff.project;
        const operations = await GuardOperationRepositoryContract_1.default.all(request, project);
        return response.json(operations);
    }
}
exports.default = GuardOperationsController;
//# sourceMappingURL=GuardOperationsController.js.map