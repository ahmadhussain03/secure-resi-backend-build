"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentEmergencyContact_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResidentEmergencyContact"));
class ResidentEmergencyContactRepository {
    async create(data) {
        const contact = await ResidentEmergencyContact_1.default.create(data);
        return contact;
    }
    async all(request, unit) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const contacts = await ResidentEmergencyContact_1.default.query().where('unit_id', unit.id).paginate(page, limit);
        return contacts;
    }
    async allByProject(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const contacts = await ResidentEmergencyContact_1.default.query().where('project_id', project.id).paginate(page, limit);
        return contacts;
    }
    async destroyById(id, unit) {
        const contact = await this.findById(id, unit);
        await contact.delete();
        return true;
    }
    async findByIdAndUpdate(id, unit, data) {
        const contact = await this.findById(id, unit);
        contact.name = data.name ? data.name : contact.name;
        contact.phone = data.phone ? data.phone : contact.phone;
        await contact.save();
        return contact;
    }
    async findById(id, unit) {
        const contact = await ResidentEmergencyContact_1.default.query().where('unit_id', unit.id).where('id', id).firstOrFail();
        return contact;
    }
}
exports.default = ResidentEmergencyContactRepository;
//# sourceMappingURL=ResidentEmergencyContactRepository.js.map