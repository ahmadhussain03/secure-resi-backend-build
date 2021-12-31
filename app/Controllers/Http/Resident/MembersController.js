"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class MembersController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        await authUser.resident.load('units');
        const units = authUser.resident.units;
        const unitIds = units.map(unit => unit.id);
        const members = await ResidentRepositoryContract_1.default.allByUnitIds(unitIds, request);
        return response.json(members);
    }
    async request({ request, response, auth }) {
        const authUser = auth.user;
        const units = authUser.resident.units;
        const unitIds = units.map(unit => unit.id);
        const members = await ResidentRepositoryContract_1.default.requestByUnitIds(unitIds, request);
        return response.json(members);
    }
    async approve({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const verificationSchema = Validator_1.schema.create({
            member: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        const data = await request.validate({ schema: verificationSchema });
        const resident = await ResidentRepositoryContract_1.default.findById(data.member, project);
        resident.resident.isApproved = true;
        resident.resident.save();
        return response.json(resident);
    }
    async reject({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.resident.project;
        const verificationSchema = Validator_1.schema.create({
            member: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        const data = await request.validate({ schema: verificationSchema });
        const resident = await ResidentRepositoryContract_1.default.findById(data.member, project);
        await resident.delete();
        return response.json({ message: "Request Rejected Successfully!" });
    }
}
exports.default = MembersController;
//# sourceMappingURL=MembersController.js.map