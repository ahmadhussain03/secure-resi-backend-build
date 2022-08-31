"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelRelationExistException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ModelRelationExistException"));
const Block_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Block"));
const ParkingLevel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ParkingLevel"));
class ParkingLevelRepository {
    async create(data) {
        const block = await Block_1.default.query().where('id', data.blockId).where('project_id', data.projectId).firstOrFail();
        const levelsArray = data.levels.map(level => ({
            projectId: data.projectId,
            blockId: block.id,
            status: data.status,
            name: level
        }));
        const levels = await ParkingLevel_1.default.createMany(levelsArray);
        return levels;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const blockId = query.blockId;
        const parkingLevels = ParkingLevel_1.default.query().where('project_id', project.id).preload('block');
        if (blockId) {
            parkingLevels.where('block_id', blockId);
        }
        return await parkingLevels.paginate(page, limit);
    }
    async destroyById(id, project) {
        const level = await ParkingLevel_1.default.query().where('id', id).where('project_id', project.id).doesntHave('parkingSlots').first();
        if (!level) {
            throw new ModelRelationExistException_1.default('Cannot Deleted Parking Level. Parking Level Relation Data exists!');
        }
        await level.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const parkingLevel = await this.findById(id, project);
        const block = await Block_1.default.query().where('id', data.blockId).where('project_id', project.id).firstOrFail();
        parkingLevel.blockId = block.id;
        parkingLevel.name = data.name ?? parkingLevel.name;
        parkingLevel.status = data.status ?? parkingLevel.status;
        return await parkingLevel.save();
    }
    async findById(id, project) {
        const level = await ParkingLevel_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return level;
    }
}
exports.default = ParkingLevelRepository;
//# sourceMappingURL=ParkingLevelRepository.js.map