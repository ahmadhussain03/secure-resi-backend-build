"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Project_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Project"));
class ProjectVerificationsController {
    async index({ request, response }) {
        const verificationSchema = Validator_1.schema.create({
            project: Validator_1.schema.string({ trim: true, escape: true })
        });
        const data = await request.validate({ schema: verificationSchema });
        const project = await Project_1.default.query().where('code', data.project).firstOrFail();
        return response.json(project);
    }
}
exports.default = ProjectVerificationsController;
//# sourceMappingURL=ProjectVerificationsController.js.map