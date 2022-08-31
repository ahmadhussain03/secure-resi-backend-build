"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Race_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Race"));
class RaceRepository {
    async create(data) {
        const race = await Race_1.default.create(data);
        return race;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const raceQuery = Race_1.default.query().where('project_id', project.id);
        if (query.race) {
            raceQuery.where('race', query.race);
        }
        return await raceQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const race = await this.findById(id, project);
        await race.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const race = await this.findById(id, project);
        race.status = data.status ?? race.status;
        race.race = data.race ?? race.race;
        return await race.save();
    }
    async findById(id, project) {
        const race = await Race_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return race;
    }
}
exports.default = RaceRepository;
//# sourceMappingURL=RaceRepository.js.map