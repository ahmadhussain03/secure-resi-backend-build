"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const VisitorPlanRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/VisitorPlanRepositoryContract"));
const CreateVisitorPlanValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Vms/CreateVisitorPlanValidator"));
const UpdateVisitorPlanValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Vms/UpdateVisitorPlanValidator"));
class VisitorPlansController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const visitorPlan = await VisitorPlanRepositoryContract_1.default.allByProject(request, project);
        return response.json(visitorPlan);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const id = params.id;
        const visitor = await VisitorPlanRepositoryContract_1.default.findByIdByProject(id, project);
        return response.json(visitor);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateVisitorPlanValidator_1.default);
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        const resident = await ResidentRepositoryContract_1.default.findByIdByUnit(data.resident, unit.id);
        data.projectId = project.id;
        data.userId = resident.id;
        data.unitId = unit.id;
        const visitorPlan = await VisitorPlanRepositoryContract_1.default.create(data);
        visitorPlan.visitors.forEach(async (visitor) => {
            if (visitor.email) {
                await Mail_1.default.sendLater((message) => {
                    message
                        .from('forgot-password@secureresi.com')
                        .to(visitor.email)
                        .subject('Visit Plan!')
                        .htmlView('visitors/plan', { visitor });
                });
            }
        });
        return response.json(visitorPlan);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(UpdateVisitorPlanValidator_1.default);
        const visitorPlan = await VisitorPlanRepositoryContract_1.default.findByIdByProjectAndUpdate(params.id, project, data);
        return response.json(visitorPlan);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await VisitorPlanRepositoryContract_1.default.destroyByIdByProject(params.id, project);
        return response.json({ message: "Plan Deleted Successfully" });
    }
}
exports.default = VisitorPlansController;
//# sourceMappingURL=VisitorPlansController.js.map