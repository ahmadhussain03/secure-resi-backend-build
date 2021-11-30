"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentEmergencyContactRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentEmergencyContactRepositoryContract"));
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const CreateEmergencyContactValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/CreateEmergencyContactValidator"));
const UpdateEmergencyContactValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/UpdateEmergencyContactValidator"));
class ResidentEmergencyContactsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const contacts = await ResidentEmergencyContactRepositoryContract_1.default.all(request, unit);
        return response.json(contacts);
    }
    async show({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const contact = await ResidentEmergencyContactRepositoryContract_1.default.findById(params.id, unit);
        return response.json(contact);
    }
    async store({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const data = await request.validate(CreateEmergencyContactValidator_1.default);
        data.projectId = project.id;
        data.userId = authUser.id;
        await UnitRepositoryContract_1.default.findById(data.unitId, project);
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('resident_emergency_contact/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const contact = await ResidentEmergencyContactRepositoryContract_1.default.create(data);
        return response.json(contact);
    }
    async update({ response, request, auth, params }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const data = await request.validate(UpdateEmergencyContactValidator_1.default);
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const image = request.file('image');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('resident_emergency_contact/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        const contact = await ResidentEmergencyContactRepositoryContract_1.default.findByIdAndUpdate(params.id, unit, data);
        return response.json(contact);
    }
    async destroy({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        await ResidentEmergencyContactRepositoryContract_1.default.destroyById(params.id, unit);
        return response.json({ message: 'Emergency Contact Deleted Successfully!' });
    }
}
exports.default = ResidentEmergencyContactsController;
//# sourceMappingURL=ResidentEmergencyContactsController.js.map