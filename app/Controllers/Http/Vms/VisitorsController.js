"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const VisitorRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/VisitorRepositoryContract"));
const CreateVisitorValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/CreateVisitorValidator"));
class VisitorsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const visitors = await VisitorRepositoryContract_1.default.allByProject(request, project);
        return response.json(visitors);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateVisitorValidator_1.default);
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        data.projectId = project.id;
        data.userId = authUser.id;
        data.unitId = unit.id;
        data.addedBy = 'admin';
        const visitor = await VisitorRepositoryContract_1.default.create(data, request);
        return response.json(visitor);
    }
}
exports.default = VisitorsController;
//# sourceMappingURL=VisitorsController.js.map