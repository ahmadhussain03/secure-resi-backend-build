"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Level_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Level"));
class LevelRepository {
    async create(data) {
        let levelsArray = data.levels.map(level => {
            return {
                projectId: data.projectId,
                status: data.status,
                blockId: data.blockId,
                name: level
            };
        });
        const levels = await Level_1.default.createMany(levelsArray);
        return levels;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const levelQuery = Level_1.default.query().preload('block').where('project_id', project.id);
        const levels = await levelQuery.orderBy('created_at', 'desc').paginate(page, limit);
        return levels;
    }
    async destroyById(id, project) {
        const item = await this.findById(id, project);
        await item.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const item = await this.findById(id, project);
        item.name = data.name ? data.name : item.name;
        item.status = data.status ? data.status : item.status;
        item.blockId = data.blockId ? data.blockId : item.blockId;
        await item.save();
        return item;
    }
    async findById(id, project) {
        return await Level_1.default.query().where('project_id', project.id).where('id', id).firstOrFail();
    }
}
exports.default = LevelRepository;
//# sourceMappingURL=LevelRepository.js.map