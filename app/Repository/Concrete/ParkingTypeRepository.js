"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ModelRelationExistException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ModelRelationExistException"));
const ParkingType_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ParkingType"));
class ParkingTypeRepository {
    async create(data) {
        const parkingType = await ParkingType_1.default.create(data);
        return parkingType;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        let name = query.name;
        const parkingTypeQuery = ParkingType_1.default.query().where('project_id', project.id);
        if (name) {
            parkingTypeQuery.where('custom_parking_type', 'like', `%${name}%`);
        }
        return await parkingTypeQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const parkingType = await ParkingType_1.default.query().where('project_id', project.id).where('id', id).doesntHave('parkingSlots').first();
        if (!parkingType) {
            throw new ModelRelationExistException_1.default('Cannot Deleted Parking Type. Parking Type Relation Data exists!');
        }
        await parkingType.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const parkingType = await this.findById(id, project);
        parkingType.customParkingType = data.customParkingType ?? parkingType.customParkingType;
        parkingType.availableInVisitor = data.availableInVisitor ?? parkingType.availableInVisitor;
        parkingType.startTime = data.startTime ?? parkingType.startTime;
        parkingType.endTime = data.endTime ?? parkingType.endTime;
        parkingType.allowTimeHour = data.allowTimeHour ?? parkingType.allowTimeHour;
        parkingType.allowTimeMinute = data.allowTimeMinute ?? parkingType.allowTimeMinute;
        parkingType.timeFlexibilityHour = data.timeFlexibilityHour ?? parkingType.timeFlexibilityHour;
        parkingType.timeFlexibilityMinute = data.timeFlexibilityMinute ?? parkingType.timeFlexibilityMinute;
        parkingType.overstayPenalty = data.overstayPenalty ?? parkingType.overstayPenalty;
        parkingType.parkingFee = data.parkingFee ?? parkingType.parkingFee;
        parkingType.status = data.status ?? parkingType.status;
        return await parkingType.save();
    }
    async findById(id, project) {
        const parkingType = await ParkingType_1.default.query().where('project_id', project.id).where('id', id).firstOrFail();
        return parkingType;
    }
}
exports.default = ParkingTypeRepository;
//# sourceMappingURL=ParkingTypeRepository.js.map