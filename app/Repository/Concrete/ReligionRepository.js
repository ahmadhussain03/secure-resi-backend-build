"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Religion_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Religion"));
class ReligionRepository {
    async create(data) {
        const religion = await Religion_1.default.create(data);
        return religion;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const religionQuery = Religion_1.default.query().where('project_id', project.id);
        if (query.religion) {
            religionQuery.where('religion', query.religion);
        }
        return await religionQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const religion = await this.findById(id, project);
        await religion.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const religion = await this.findById(id, project);
        religion.status = data.status ?? religion.status;
        religion.religion = data.religion ?? religion.religion;
        return await religion.save();
    }
    async findById(id, project) {
        const religion = await Religion_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return religion;
    }
}
exports.default = ReligionRepository;
//# sourceMappingURL=ReligionRepository.js.map