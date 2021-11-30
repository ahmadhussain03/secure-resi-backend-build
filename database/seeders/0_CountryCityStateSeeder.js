"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const country_state_city_1 = require("country-state-city");
const Country_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Country"));
const State_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/State"));
const City_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/City"));
class CountryCityStateSeederSeeder extends Seeder_1.default {
    async run() {
        await Country_1.default.query().delete();
        await State_1.default.query().delete();
        await City_1.default.query().delete();
        const countries = country_state_city_1.Country.getAllCountries();
        for (let i = 0; i < 5; i++) {
            let country = countries[i];
            let countryObject = await Country_1.default.create({
                code: country.isoCode,
                name: country.name.toLowerCase()
            });
            let states = country_state_city_1.State.getStatesOfCountry(country.isoCode);
            for (let s = 0; s < states.length; s++) {
                let state = states[s];
                let stateObject = await State_1.default.create({
                    code: state.isoCode,
                    name: state.name.toLowerCase(),
                    countryId: countryObject.id
                });
                let cities = country_state_city_1.City.getCitiesOfState(country.isoCode, state.isoCode);
                for (let c = 0; c < cities.length; c++) {
                    let city = cities[c];
                    await City_1.default.create({
                        name: city.name.toLowerCase(),
                        stateId: stateObject.id
                    });
                }
            }
        }
    }
}
exports.default = CountryCityStateSeederSeeder;
//# sourceMappingURL=0_CountryCityStateSeeder.js.map