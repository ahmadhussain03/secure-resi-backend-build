"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckpointRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/CheckpointRepositoryContract"));
class CheckpointsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const checkpoints = await CheckpointRepositoryContract_1.default.all(request, project);
        return response.json(checkpoints);
    }
}
exports.default = CheckpointsController;
//# sourceMappingURL=CheckpointsController.js.map