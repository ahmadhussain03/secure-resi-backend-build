"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const ForbiddenException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ForbiddenException"));
class OwnerRequestsController {
    async index({ request, auth, response }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const members = await ResidentRepositoryContract_1.default.requestByProject(project, request);
        return response.json(members);
    }
    async approve({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const verificationSchema = Validator_1.schema.create({
            owner: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        const data = await request.validate({ schema: verificationSchema });
        const resident = await ResidentRepositoryContract_1.default.findById(data.owner, project);
        if (resident.resident.type !== 'owner') {
            throw new ForbiddenException_1.default();
        }
        resident.resident.isApproved = true;
        resident.resident.save();
        return response.json(resident);
    }
    async reject({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const verificationSchema = Validator_1.schema.create({
            owner: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        const data = await request.validate({ schema: verificationSchema });
        const resident = await ResidentRepositoryContract_1.default.findById(data.owner, project);
        await resident.delete();
        return response.json({ message: "Request Rejected Successfully!" });
    }
}
exports.default = OwnerRequestsController;
//# sourceMappingURL=OwnerRequestsController.js.map