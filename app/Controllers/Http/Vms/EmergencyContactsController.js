"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmergencyContactRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/EmergencyContactRepositoryContract"));
class EmergencyContactsController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const contacts = await EmergencyContactRepositoryContract_1.default.all(request, project);
        return response.json(contacts);
    }
}
exports.default = EmergencyContactsController;
//# sourceMappingURL=EmergencyContactsController.js.map