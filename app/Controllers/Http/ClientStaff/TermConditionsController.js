"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TermConditionRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/TermConditionRepositoryContract"));
const CreateGuideBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGuideBookValidator"));
class TermConditionsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const guideBook = await TermConditionRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(guideBook);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateGuideBookValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const guideBook = await TermConditionRepositoryContract_1.default.create(data);
        return response.json(guideBook);
    }
}
exports.default = TermConditionsController;
//# sourceMappingURL=TermConditionsController.js.map