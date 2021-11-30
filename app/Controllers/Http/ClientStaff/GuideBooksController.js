"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GuideBookRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/GuideBookRepositoryContract"));
const CreateGuideBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateGuideBookValidator"));
const UpdateGuideBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateGuideBookValidator"));
class GuideBooksController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const guideBook = await GuideBookRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(guideBook);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateGuideBookValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const guideBook = await GuideBookRepositoryContract_1.default.create(data);
        return response.json(guideBook);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateGuideBookValidator_1.default);
        const authUser = auth.user;
        const guideBook = await GuideBookRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(guideBook);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const guideBook = await GuideBookRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(guideBook);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await GuideBookRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Guide Book Deleted Successfully" });
    }
}
exports.default = GuideBooksController;
//# sourceMappingURL=GuideBooksController.js.map