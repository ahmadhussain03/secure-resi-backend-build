"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Country_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Country"));
class CountriesController {
    async index({ request, response }) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const name = query.name;
        const countryQuery = Country_1.default.query();
        if (name) {
            countryQuery.where('name', 'like', `%${name.toLowerCase()}%`);
        }
        const countries = await countryQuery.paginate(page, limit);
        return response.json(countries);
    }
}
exports.default = CountriesController;
//# sourceMappingURL=CountriesController.js.map