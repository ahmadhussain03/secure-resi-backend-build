"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Unit"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UnitsController {
    async index({ request, response }) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const units = await Unit_1.default.query().where('project_id', query.project ?? 0).preload('block').preload('level').paginate(page, limit);
        return response.json(units);
    }
    async verify({ request, response }) {
        const verificationSchema = Validator_1.schema.create({
            project: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            unit: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            type: Validator_1.schema.enum(['owner', 'resident', 'member'])
        });
        const data = await request.validate({ schema: verificationSchema });
        const unitQuery = Unit_1.default.query().where('project_id', data.project).where('id', data.unit);
        if (data.type == 'owner') {
            unitQuery.has('allOwners', '=', 0);
        }
        const unit = await unitQuery.firstOrFail();
        return response.json(unit);
    }
}
exports.default = UnitsController;
//# sourceMappingURL=UnitsController.js.map