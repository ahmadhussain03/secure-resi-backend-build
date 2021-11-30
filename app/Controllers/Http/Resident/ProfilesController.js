"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
const UpdateProfileValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/UpdateProfileValidator"));
class ProfilesController {
    async update({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const data = await request.validate(UpdateProfileValidator_1.default);
        const resident = await ResidentRepositoryContract_1.default.findByIdAndUpdate(authUser.id, project, data);
        return response.json(resident);
    }
}
exports.default = ProfilesController;
//# sourceMappingURL=ProfilesController.js.map