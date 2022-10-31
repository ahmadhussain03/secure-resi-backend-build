"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VisitorTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/VisitorTypeRepositoryContract"));
class VisitorTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const visitorTypes = await VisitorTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(visitorTypes);
    }
}
exports.default = VisitorTypesController;
//# sourceMappingURL=VisitorTypesController.js.map