"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const VisitorPlanRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/VisitorPlanRepositoryContract"));
const CreateVisitorPlanValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/CreateVisitorPlanValidator"));
const UpdateVisitorPlanValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/UpdateVisitorPlanValidator"));
class VisitorPlansController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const visitorPlan = await VisitorPlanRepositoryContract_1.default.allByUnit(request, unit);
        return response.json(visitorPlan);
    }
    async show({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const id = params.id;
        const visitor = await VisitorPlanRepositoryContract_1.default.findByIdByUnit(id, unit);
        return response.json(visitor);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(CreateVisitorPlanValidator_1.default);
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        data.projectId = project.id;
        data.userId = authUser.id;
        data.unitId = unit.id;
        const visitorPlan = await VisitorPlanRepositoryContract_1.default.create(data);
        return response.json(visitorPlan);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(UpdateVisitorPlanValidator_1.default);
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const visitorPlan = await VisitorPlanRepositoryContract_1.default.findByIdByUnitAndUpdate(params.id, unit, data);
        return response.json(visitorPlan);
    }
    async destroy({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        await VisitorPlanRepositoryContract_1.default.destroyByIdByUnit(params.id, unit);
        return response.json({ message: "Plan Deleted Successfully" });
    }
}
exports.default = VisitorPlansController;
//# sourceMappingURL=VisitorPlansController.js.map