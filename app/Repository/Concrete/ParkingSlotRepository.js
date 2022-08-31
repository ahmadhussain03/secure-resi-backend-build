"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelRelationExistException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ModelRelationExistException"));
const ParkingLevel_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ParkingLevel"));
const ParkingSlot_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ParkingSlot"));
const ParkingType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ParkingType"));
class ParkingSlotRepository {
    async create(data) {
        const parkingLevel = await ParkingLevel_1.default.query().where('project_id', data.projectId).where('id', data.parkingLevelId).firstOrFail();
        const parkingType = await ParkingType_1.default.query().where('project_id', data.projectId).where('id', data.parkingTypeId).firstOrFail();
        const slotsArray = data.slots.map(slot => ({
            name: slot.name,
            customSlotName: slot.customSlotName,
            parkingLevelId: parkingLevel.id,
            parkingTypeId: parkingType.id,
            status: data.status,
            allowBlockFromSlotNumber: data.allowBlockFromSlotNumber,
            projectId: data.projectId
        }));
        const slots = await ParkingSlot_1.default.createMany(slotsArray);
        return slots;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const parkingSlotQuery = ParkingSlot_1.default.query().where('project_id', project.id).preload('parkingLevel', query => query.preload('block')).preload('parkingType');
        if (query.parkingLevelId) {
            parkingSlotQuery.where('parking_level_id', query.parkingLevelId);
        }
        if (query.parkingTypeId) {
            parkingSlotQuery.where('parking_type_id', query.parkingTypeId);
        }
        return await parkingSlotQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const slot = await ParkingSlot_1.default.query().where('id', id).where('project_id', project.id).doesntHave('checkIns').first();
        if (!slot) {
            throw new ModelRelationExistException_1.default('Cannot Deleted Parking Slot. Parking Slot Relation Data exists!');
        }
        await slot.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const slot = await this.findById(id, project);
        const parkingLevel = await ParkingLevel_1.default.query().where('project_id', project.id).where('id', data.parkingLevelId).firstOrFail();
        slot.parkingLevelId = parkingLevel.id;
        slot.name = data.name ?? slot.name;
        slot.customSlotName = data.customSlotName ?? slot.customSlotName;
        if (data.parkingTypeId) {
            const parkingType = await ParkingType_1.default.query().where('project_id', project.id).where('id', data.parkingTypeId).firstOrFail();
            slot.parkingTypeId = parkingType.id;
        }
        slot.status = data.status ?? slot.status;
        slot.allowBlockFromSlotNumber = data.allowBlockFromSlotNumber ?? slot.allowBlockFromSlotNumber;
        return await slot.save();
    }
    async findById(id, project) {
        const slot = await ParkingSlot_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return slot;
    }
}
exports.default = ParkingSlotRepository;
//# sourceMappingURL=ParkingSlotRepository.js.map