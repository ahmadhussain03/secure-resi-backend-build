"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Item"));
class ItemRepository {
    async create(data) {
        const item = await Item_1.default.create(data);
        return item;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page | 1;
        const limit = query.limit | 15;
        const isNotAssigned = query.notAssigned ? query.notAssigned : null;
        const itemQuery = Item_1.default.query().where('project_id', project.id);
        if (isNotAssigned) {
            itemQuery.whereDoesntHave('users', (query) => {
                query.whereColumn('item_id', 'items.id');
            });
        }
        const items = await itemQuery.orderBy('created_at', 'desc').paginate(page, limit);
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
        item.description = data.description ? data.description : item.description;
        item.image = data.image ? data.image : item.image;
        await item.save();
        return item;
    }
    async findById(id, project) {
        return await Item_1.default.query().where('project_id', project.id).where('id', id).firstOrFail();
    }
}
exports.default = ItemRepository;
//# sourceMappingURL=ItemRepository.js.map