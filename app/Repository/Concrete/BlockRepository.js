"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Block_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Block"));
class BlockRepository {
    async create(data) {
        const block = await Block_1.default.create(data);
        return block;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const search = query.search || "";
        const blockQuery = Block_1.default.query().where('project_id', project.id);
        if (search) {
            blockQuery.where("name", "like", `%${search}%`);
        }
        const items = await blockQuery.orderBy('created_at', 'desc').paginate(page, limit);
        return items;
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
        await item.save();
        return item;
    }
    async findById(id, project) {
        return await Block_1.default.query().where('project_id', project.id).where('id', id).firstOrFail();
    }
}
exports.default = BlockRepository;
//# sourceMappingURL=BlockRepository.js.map