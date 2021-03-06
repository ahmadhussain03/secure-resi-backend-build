"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const CreateOwnerValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateOwnerValidator"));
const UpdateOwnerValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateOwnerValidator"));
class OwnersController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const owners = await ResidentRepositoryContract_1.default.all(request, project, 'owner');
        return response.json(owners);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const owner = await ResidentRepositoryContract_1.default.findById(params.id, project);
        return response.json(owner);
    }
    async store({ response, auth, request }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateOwnerValidator_1.default);
        data.projectId = project.id;
        data.username = data.email;
        data.userType = UserType_1.UserType.resident;
        data.isApproved = true;
        data.type = 'owner';
        const role = await Role_1.default.query().where('name', 'owner').firstOrFail();
        data.roleId = role.id;
        const owner = await ResidentRepositoryContract_1.default.create(data, request);
        return response.json(owner);
    }
    async update({ response, request, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(UpdateOwnerValidator_1.default);
        data.type = 'owner';
        const owner = await ResidentRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data, request);
        return response.json(owner);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        await ResidentRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: "Owner Deleted Successfully" });
    }
}
exports.default = OwnersController;
//# sourceMappingURL=OwnersController.js.map