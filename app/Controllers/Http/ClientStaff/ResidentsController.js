"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const CreateResidentValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateResidentValidator"));
const UpdateResidentValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateResidentValidator"));
class ResidentsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const residents = await ResidentRepositoryContract_1.default.all(request, project, 'resident');
        return response.json(residents);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const resident = await ResidentRepositoryContract_1.default.findById(params.id, project);
        return response.json(resident);
    }
    async store({ response, auth, request }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateResidentValidator_1.default);
        data.projectId = project.id;
        data.username = data.email;
        data.userType = UserType_1.UserType.resident;
        data.isApproved = true;
        data.type = 'resident';
        const role = await Role_1.default.query().where('name', 'resident').firstOrFail();
        data.roleId = role.id;
        const resident = await ResidentRepositoryContract_1.default.create(data, request);
        return response.json(resident);
    }
    async update({ response, request, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(UpdateResidentValidator_1.default);
        const resident = await ResidentRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(resident);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await ResidentRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: "Resident Deleted Successfully" });
    }
}
exports.default = ResidentsController;
//# sourceMappingURL=ResidentsController.js.map