"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoveTermConditionRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/MoveTermConditionRepositoryContract"));
const CreateGuideBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGuideBookValidator"));
const UpdateGuideBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateGuideBookValidator"));
class MoveTermConditionsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const guideBook = await MoveTermConditionRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(guideBook);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateGuideBookValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const guideBook = await MoveTermConditionRepositoryContract_1.default.create(data);
        return response.json(guideBook);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateGuideBookValidator_1.default);
        const authUser = auth.user;
        const termCondition = await MoveTermConditionRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(termCondition);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const moveTermCondition = await MoveTermConditionRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(moveTermCondition);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await MoveTermConditionRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Move Term Condition Deleted Successfully" });
    }
}
exports.default = MoveTermConditionsController;
//# sourceMappingURL=MoveTermConditionsController.js.map