"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VisitorTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/VisitorTypeRepositoryContract"));
const CreateVisitorTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateVisitorTypeValidator"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const UpdateVisitorTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateVisitorTypeValidator"));
class VisitorTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const visitorTypes = await VisitorTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(visitorTypes);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateVisitorTypeValidator_1.default);
        data.projectId = projectId;
        const image = request.file('image');
        const fileName = `${(0, Helpers_1.cuid)()}.${image?.extname}`;
        await image?.moveToDisk('visitor_type', {
            name: fileName
        });
        data.image = fileName;
        const visitorType = await VisitorTypeRepositoryContract_1.default.create(data);
        return response.json(visitorType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateVisitorTypeValidator_1.default);
        const authUser = auth.user;
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.moveToDisk('visitor_type', {
                name: fileName
            });
            data.image = fileName;
        }
        const race = await VisitorTypeRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(race);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const race = await VisitorTypeRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(race);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await VisitorTypeRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Visitor Type Deleted Successfully" });
    }
}
exports.default = VisitorTypesController;
//# sourceMappingURL=VisitorTypesController.js.map