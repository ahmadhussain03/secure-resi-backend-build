"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FacilityRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/FacilityRepositoryContract"));
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const Facility_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Facility"));
const FacilityType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/FacilityType"));
const MoAccount_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/MoAccount"));
const CreateFacilityValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/CreateFacilityValidator"));
const UpdateFacilityValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/UpdateFacilityValidator"));
class FacilitiesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const facilities = await FacilityRepositoryContract_1.default.allByUnit(request, unit);
        return response.json(facilities);
    }
    async show({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const id = params.id;
        const facility = await FacilityRepositoryContract_1.default.findByIdByUnit(id, unit);
        return response.json(facility);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(CreateFacilityValidator_1.default);
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        if (data.moAccountId) {
            await MoAccount_1.default.query().where('id', data.moAccountId).where('project_id', project.id).firstOrFail();
        }
        await FacilityType_1.default.query().where('id', data.facilityTypeId).where('project_id', project.id).firstOrFail();
        data.projectId = project.id;
        data.userId = authUser.id;
        data.unitId = unit.id;
        const exists = await Facility_1.default.query().where('unit_id', unit.id).whereNot('status', 'Completed').first();
        if (exists) {
            return response.status(401).json({
                errors: [
                    { message: 'Facility Already Booked.' }
                ]
            });
        }
        const facility = await FacilityRepositoryContract_1.default.create(data);
        return response.json(facility);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(UpdateFacilityValidator_1.default);
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        if (data.moAccountId) {
            await MoAccount_1.default.query().where('id', data.moAccountId).where('project_id', project.id).firstOrFail();
        }
        if (data.facilityTypeId) {
            await FacilityType_1.default.query().where('id', data.facilityTypeId).where('project_id', project.id).firstOrFail();
        }
        const facility = await FacilityRepositoryContract_1.default.findByIdByUnitAndUpdate(params.id, unit, data);
        return response.json(facility);
    }
    async destroy({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        await FacilityRepositoryContract_1.default.destroyByIdByUnit(params.id, unit);
        return response.json({ message: "Facility Deleted Successfully" });
    }
}
exports.default = FacilitiesController;
//# sourceMappingURL=FacilitiesController.js.map