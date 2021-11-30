"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const VisitorRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/VisitorRepositoryContract"));
const CreateVisitorValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/CreateVisitorValidator"));
const UpdateVisitorValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/UpdateVisitorValidator"));
class VisitorsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const visitors = await VisitorRepositoryContract_1.default.allByUnit(request, unit);
        return response.json(visitors);
    }
    async show({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const id = params.id;
        const visitor = await VisitorRepositoryContract_1.default.findByIdByUnit(id, unit);
        return response.json(visitor);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(CreateVisitorValidator_1.default);
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        data.projectId = project.id;
        data.userId = authUser.id;
        data.unitId = unit.id;
        const visitor = await VisitorRepositoryContract_1.default.create(data, request);
        return response.json(visitor);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(UpdateVisitorValidator_1.default);
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const visitor = await VisitorRepositoryContract_1.default.findByIdByUnitAndUpdate(params.id, unit, data);
        return response.json(visitor);
    }
    async destroy({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        await VisitorRepositoryContract_1.default.destroyByIdByUnit(params.id, unit);
        return response.json({ message: "Visitor Deleted Successfully" });
    }
}
exports.default = VisitorsController;
//# sourceMappingURL=VisitorsController.js.map