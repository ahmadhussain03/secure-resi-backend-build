"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Move_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Move"));
class MoveRepository {
    async create(data) {
        const move = await Move_1.default.create({
            type: data.type,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            fromTime: data.fromTime,
            toTime: data.toTime,
            bankOption: data.bankOption,
            descriptionOfGoods: data.descriptionOfGoods,
            notes: data.notes,
            vehicleType: data.vehicleType,
            vehicleNo: data.vehicleNo,
            driverName: data.driverName,
            driverContactNo: data.driverContactNo,
            payment: data.payment,
            bankName: data.bankName,
            transactionNumber: data.transactionNumber,
            amount: data.amount,
            userId: data.userId,
            projectId: data.projectId,
            unitId: data.unitId,
            moAccountId: data.moAccountId,
            chequeNo: data.chequeNo
        });
        if (move.moAccountId) {
            await move.load('moAccount');
        }
        return move;
    }
    async allByUnit(request, unit) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const moveQuery = Move_1.default.query().where('unit_id', unit.id).preload('moAccount');
        const moves = await moveQuery.paginate(page, limit);
        return moves;
    }
    async allByProject(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const moveQuery = Move_1.default.query().where('project_id', project.id).preload('moAccount');
        const moves = await moveQuery.paginate(page, limit);
        return moves;
    }
    async destroyByIdByUnit(id, unit) {
        const move = await this.findByIdByUnit(id, unit);
        await move.delete();
        return true;
    }
    async findByIdByUnitAndUpdate(id, unit, data) {
        const move = await this.findByIdByUnit(id, unit);
        move.type = data.type ?? move.type;
        move.dateFrom = data.dateFrom ?? move.dateFrom;
        move.dateTo = data.dateTo ?? move.dateTo;
        move.fromTime = data.fromTime ?? move.fromTime;
        move.toTime = data.toTime ?? move.toTime;
        move.bankOption = data.bankOption ?? move.bankOption;
        move.descriptionOfGoods = data.descriptionOfGoods ?? move.descriptionOfGoods;
        move.notes = data.notes ?? move.notes;
        move.vehicleType = data.vehicleType ?? move.vehicleType;
        move.vehicleNo = data.vehicleNo ?? move.vehicleNo;
        move.driverName = data.driverName ?? move.driverName;
        move.driverContactNo = data.driverContactNo ?? move.driverContactNo;
        move.payment = data.payment ?? move.payment;
        move.bankName = data.bankName ?? move.bankName;
        move.transactionNumber = data.transactionNumber ?? move.transactionNumber;
        move.amount = data.amount ?? move.amount;
        move.moAccountId = data.moAccountId ?? move.moAccountId;
        move.chequeNo = data.chequeNo ?? move.chequeNo;
        await move.save();
        if (move.moAccountId) {
            await move.load('moAccount');
        }
        return move;
    }
    async findByIdByProjectAndUpdate(id, project, data) {
        const move = await this.findByIdByProject(id, project);
        move.type = data.type ?? move.type;
        move.dateFrom = data.dateFrom ?? move.dateFrom;
        move.dateTo = data.dateTo ?? move.dateTo;
        move.descriptionOfGoods = data.descriptionOfGoods ?? move.descriptionOfGoods;
        move.notes = data.notes ?? move.notes;
        move.vehicleType = data.vehicleType ?? move.vehicleType;
        move.vehicleNo = data.vehicleNo ?? move.vehicleNo;
        move.driverName = data.driverName ?? move.driverName;
        move.driverContactNo = data.driverContactNo ?? move.driverContactNo;
        move.payment = data.payment ?? move.payment;
        move.bankName = data.bankName ?? move.bankName;
        move.transactionNumber = data.transactionNumber ?? move.transactionNumber;
        move.amount = data.amount ?? move.amount;
        move.moAccountId = data.moAccountId ?? move.moAccountId;
        move.status = data.status ?? move.status;
        await move.save();
        if (move.moAccountId) {
            await move.load('moAccount');
        }
        return move;
    }
    async findByIdByUnit(id, unit) {
        const move = await Move_1.default.query().preload('moAccount').where('unit_id', unit.id).where('id', id).firstOrFail();
        return move;
    }
    async findByIdByProject(id, project) {
        const move = await Move_1.default.query().preload('moAccount').preload('user').where('project_id', project.id).where('id', id).firstOrFail();
        return move;
    }
}
exports.default = MoveRepository;
//# sourceMappingURL=MoveRepository.js.map