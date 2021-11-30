"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class SettingsController {
    async update({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const verificationSchema = Validator_1.schema.create({
            seekPermission: Validator_1.schema.boolean(),
            unitId: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        const data = await request.validate({ schema: verificationSchema });
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId ?? 0, project);
        unit.setting.seekPermission = data.seekPermission;
        await unit.setting.save();
        return response.json(unit);
    }
}
exports.default = SettingsController;
//# sourceMappingURL=SettingsController.js.map