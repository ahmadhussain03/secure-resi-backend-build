"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoveTermConditionRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/MoveTermConditionRepositoryContract"));
class MoveTermConditionsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const guideBook = await MoveTermConditionRepositoryContract_1.default.all(request, authUser.resident.project);
        return response.json(guideBook);
    }
}
exports.default = MoveTermConditionsController;
//# sourceMappingURL=MoveTermConditionsController.js.map