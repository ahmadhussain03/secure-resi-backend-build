"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const RaceRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/RaceRepositoryContract"));
const CreateRaceValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateRaceValidator"));
const UpdateRaceValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateRaceValidator"));
class RacesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const races = await RaceRepositoryContract_1.default.all(request, authUser.clientStaff.project);
        return response.json(races);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser?.clientStaff.projectId;
        let data = await request.validate(CreateRaceValidator_1.default);
        data.projectId = projectId;
        const race = await RaceRepositoryContract_1.default.create(data);
        return response.json(race);
    }
    async update({ request, response, auth, params }) {
        const data = await request.validate(UpdateRaceValidator_1.default);
        const authUser = auth.user;
        const race = await RaceRepositoryContract_1.default.findByIdAndUpdate(params.id, data, authUser.clientStaff.project);
        return response.json(race);
    }
    async show({ response, auth, params }) {
        const authUser = auth.user;
        const race = await RaceRepositoryContract_1.default.findById(params.id, authUser.clientStaff.project);
        return response.json(race);
    }
    async destroy({ response, auth, params }) {
        const authUser = auth.user;
        await RaceRepositoryContract_1.default.destroyById(params.id, authUser.clientStaff.project);
        return response.json({ message: "Race Deleted Successfully" });
    }
}
exports.default = RacesController;
//# sourceMappingURL=RacesController.js.map