"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/State"));
class StatesController {
    async index({ request, response }) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const name = query.name || null;
        const { id } = request.params();
        const stateQuery = State_1.default.query().where('country_id', id);
        if (name) {
            stateQuery.where('name', 'like', `%${name.toLowerCase()}%`);
        }
        const states = await stateQuery.paginate(page, limit);
        return response.json(states);
    }
}
exports.default = StatesController;
//# sourceMappingURL=StatesController.js.map