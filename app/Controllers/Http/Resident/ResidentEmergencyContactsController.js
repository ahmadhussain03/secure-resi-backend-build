"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmergencyContactRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/EmergencyContactRepositoryContract"));
class ResidentEmergencyContactsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const contacts = await EmergencyContactRepositoryContract_1.default.allForResident(request, project);
        return response.json(contacts);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const contact = await EmergencyContactRepositoryContract_1.default.findByIdResident(params.id, project);
        return response.json(contact);
    }
}
exports.default = ResidentEmergencyContactsController;
//# sourceMappingURL=ResidentEmergencyContactsController.js.map