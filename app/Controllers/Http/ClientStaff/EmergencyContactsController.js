"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmergencyContactRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/EmergencyContactRepositoryContract"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const CreateEmergencyContactValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateEmergencyContactValidator"));
const UpdateEmergencyContactValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateEmergencyContactValidator"));
class EmergencyContactsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const contacts = await EmergencyContactRepositoryContract_1.default.all(request, project);
        return response.json(contacts);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const contact = await EmergencyContactRepositoryContract_1.default.findById(params.id, project);
        return response.json(contact);
    }
    async store({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(CreateEmergencyContactValidator_1.default);
        data.projectId = project.id;
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('emergency_contact/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const contact = await EmergencyContactRepositoryContract_1.default.create(data);
        return response.json(contact);
    }
    async update({ response, request, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(UpdateEmergencyContactValidator_1.default);
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('emergency_contact/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const contact = await EmergencyContactRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(contact);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        await EmergencyContactRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: 'Emergency Contact Deleted Successfully!' });
    }
}
exports.default = EmergencyContactsController;
//# sourceMappingURL=EmergencyContactsController.js.map