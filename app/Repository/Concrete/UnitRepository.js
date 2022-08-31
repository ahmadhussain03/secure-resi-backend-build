"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Unit_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Unit"));
const ResidentRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ResidentRepositoryContract"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const ModelRelationExistException_1 = __importDefault(require("./../../Exceptions/ModelRelationExistException"));
class UnitRepository {
    async create(data, project) {
        const units = await Database_1.default.transaction(async (trx) => {
            let unitsArray = data.units.map(unit => {
                return {
                    projectId: data.projectId,
                    status: data.status,
                    blockId: data.blockId,
                    name: unit,
                    levelId: data.levelId
                };
            });
            const units = await Unit_1.default.createMany(unitsArray, {
                client: trx
            });
            if (units.length == 1 && data.ownerId) {
                let user = await ResidentRepositoryContract_1.default.findById(data.ownerId, project);
                const unit = units[0];
                await unit.related('allOwners').create(user.resident, undefined, { client: trx });
            }
            for (let index = 0; index < units.length; index++) {
                await units[index].related('setting').create({ seekPermission: false }, { client: trx });
            }
            return units;
        });
        return units;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const level = query.level || null;
        const block = query.block || null;
        const unitQuery = Unit_1.default.query().preload('block').preload('level').preload('owner').where('project_id', project.id);
        if (level) {
            unitQuery.where('level_id', level);
        }
        if (block) {
            unitQuery.where('block_id', block);
        }
        const units = await unitQuery.orderBy('created_at', 'desc').paginate(page, limit);
        return units;
    }
    async destroyById(id, project) {
        const unit = await Unit_1.default.query().where('project_id', project.id).where('id', id).doesntHave('residents').first();
        if (!unit) {
            throw new ModelRelationExistException_1.default('Cannot Deleted Unit. Unit Relation Data exists!');
        }
        await unit.delete();
        return true;
    }
    async findByIdAndUpdate(id, project, data) {
        const unit = await this.findById(id, project);
        unit.name = data.name ? data.name : unit.name;
        unit.status = data.status ? data.status : unit.status;
        unit.blockId = data.blockId ? data.blockId : unit.blockId;
        unit.levelId = data.levelId ? data.levelId : unit.levelId;
        await unit.save();
        if (data.ownerId) {
            let user = await ResidentRepositoryContract_1.default.findById(data.ownerId, project);
            await unit.related('residents').save(user.resident, true);
        }
        return unit;
    }
    async findById(id, project) {
        return await Unit_1.default.query().where('project_id', project.id).preload('setting').where('id', id).firstOrFail();
    }
}
exports.default = UnitRepository;
//# sourceMappingURL=UnitRepository.js.map