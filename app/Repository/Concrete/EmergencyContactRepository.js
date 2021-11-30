"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmergencyContact_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/EmergencyContact"));
class EmergencyContactRepository {
    async create(data) {
        const contact = await EmergencyContact_1.default.create(data);
        return contact;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const contacts = await EmergencyContact_1.default.query().where('project_id', project.id).paginate(page, limit);
        return contacts;
    }
    async destroyById(id, project) {
        const contact = await this.findById(id, project);
        await contact.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const contact = await this.findById(id, project);
        contact.name = data.name ? data.name : contact.name;
        contact.contactNo = data.contactNo ? data.contactNo : contact.contactNo;
        contact.forResident = data.forResident ? data.forResident : contact.forResident;
        await contact.save();
        return contact;
    }
    async findById(id, project) {
        const contact = await EmergencyContact_1.default.query().where('project_id', project.id).where('id', id).firstOrFail();
        return contact;
    }
}
exports.default = EmergencyContactRepository;
//# sourceMappingURL=EmergencyContactRepository.js.map