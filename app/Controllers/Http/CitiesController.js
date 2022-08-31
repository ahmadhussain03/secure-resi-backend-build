"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const City_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/City"));
class CitiesController {
    async index({ request, response }) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const name = query.name || null;
        const { id } = request.params();
        const cityQuery = City_1.default.query().where('state_id', id);
        if (name) {
            cityQuery.where('name', 'like', `%${name.toLowerCase()}%`);
        }
        const cities = await cityQuery.paginate(page, limit);
        return response.json(cities);
    }
}
exports.default = CitiesController;
//# sourceMappingURL=CitiesController.js.map