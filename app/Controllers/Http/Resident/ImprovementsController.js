"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const ImprovementRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ImprovementRepositoryContract"));
const CreateImprovementValidator_1 = __importDefault(require("./../../../Validators/Resident/CreateImprovementValidator"));
const UpdateImprovementValidator_1 = __importDefault(require("./../../../Validators/Resident/UpdateImprovementValidator"));
class ImprovementsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const improvements = await ImprovementRepositoryContract_1.default.allByUnit(request, unit);
        return response.json(improvements);
    }
    async show({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const id = params.id;
        const improvement = await ImprovementRepositoryContract_1.default.findByIdByUnit(id, unit);
        return response.json(improvement);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(CreateImprovementValidator_1.default);
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        data.projectId = project.id;
        data.userId = authUser.id;
        data.unitId = unit.id;
        const visitor = await ImprovementRepositoryContract_1.default.create(data, request);
        return response.json(visitor);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(UpdateImprovementValidator_1.default);
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const visitor = await ImprovementRepositoryContract_1.default.findByIdByUnitAndUpdate(params.id, unit, data);
        return response.json(visitor);
    }
    async destroy({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        await ImprovementRepositoryContract_1.default.destroyByIdByUnit(params.id, unit);
        return response.json({ message: "Improvement Deleted Successfully" });
    }
}
exports.default = ImprovementsController;
//# sourceMappingURL=ImprovementsController.js.map