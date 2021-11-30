"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlockRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/BlockRepositoryContract"));
const LevelRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LevelRepositoryContract"));
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const CreateUnitValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateUnitValidator"));
const UpdateUnitValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateUnitValidator"));
class UnitsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const units = await UnitRepositoryContract_1.default.all(request, project);
        return response.json(units);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateUnitValidator_1.default);
        await BlockRepositoryContract_1.default.findById(data.blockId, project);
        await LevelRepositoryContract_1.default.findById(data.levelId, project);
        data.projectId = project.id;
        const units = await UnitRepositoryContract_1.default.create(data, project);
        return response.json(units);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const unit = await UnitRepositoryContract_1.default.findById(params.id, project);
        return response.json(unit);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(UpdateUnitValidator_1.default);
        if (data.blockId)
            await BlockRepositoryContract_1.default.findById(data.blockId, project);
        if (data.levelId)
            await LevelRepositoryContract_1.default.findById(data.levelId, project);
        const unit = await UnitRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(unit);
    }
    async destroy({ params, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await UnitRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: "Unit Deleted Successfully" });
    }
}
exports.default = UnitsController;
//# sourceMappingURL=UnitsController.js.map