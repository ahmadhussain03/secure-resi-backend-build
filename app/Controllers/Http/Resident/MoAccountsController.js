"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoAccountRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/MoAccountRepositoryContract"));
class MoAccountsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const moAccount = await MoAccountRepositoryContract_1.default.all(request, authUser.resident.project);
        return response.json(moAccount);
    }
}
exports.default = MoAccountsController;
//# sourceMappingURL=MoAccountsController.js.map