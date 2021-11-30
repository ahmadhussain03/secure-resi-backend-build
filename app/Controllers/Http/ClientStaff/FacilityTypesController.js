"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FacilityTypeRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/FacilityTypeRepositoryContract"));
const CreateFacilityTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateFacilityTypeValidator"));
const UpdateFacilityTypeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateFacilityTypeValidator"));
class FacilityTypesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const facilityType = await FacilityTypeRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(facilityType);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        let data = await request.validate(CreateFacilityTypeValidator_1.default);
        const projectId = authUser?.clientStaff.projectId;
        data.projectId = projectId;
        const facilityType = await FacilityTypeRepositoryContract_1.default.create(data);
        return response.json(facilityType);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateFacilityTypeValidator_1.default);
        const authUser = auth.user;
        const facilityType = await FacilityTypeRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(facilityType);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const facilityType = await FacilityTypeRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(facilityType);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await FacilityTypeRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Facility Type Deleted Successfully" });
    }
}
exports.default = FacilityTypesController;
//# sourceMappingURL=FacilityTypesController.js.map