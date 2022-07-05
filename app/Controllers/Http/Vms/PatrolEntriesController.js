"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolEntryRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PatrolEntryRepositoryContract"));
class PatrolEntriesController {
    async index({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolEntryRepositoryContract_1.default.all(request, projectId);
        return response.json(entries);
    }
}
exports.default = PatrolEntriesController;
//# sourceMappingURL=PatrolEntriesController.js.map