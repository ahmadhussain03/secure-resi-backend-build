"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuideBookRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GuideBookRepositoryContract"));
class GuideBooksController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const guideBook = await GuideBookRepositoryContract_1.default.all(request, authUser.resident.project);
        return response.json(guideBook);
    }
}
exports.default = GuideBooksController;
//# sourceMappingURL=GuideBooksController.js.map