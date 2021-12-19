"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Facility_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Facility"));
class FacilityRepository {
    async create(data) {
        const facility = await Facility_1.default.create({
            facilityTypeId: data.facilityTypeId,
            dateFrom: data.dateFrom,
            dateTo: data.dateTo,
            fromTime: data.fromTime,
            toTime: data.toTime,
            bankOption: data.bankOption,
            gatheringDescription: data.gatheringDescription,
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
        if (facility.moAccountId) {
            await facility.load('moAccount');
        }
        await facility.load('facilityType');
        return facility;
    }
    async allByUnit(request, unit) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const facilityQuery = Facility_1.default.query().where('unit_id', unit.id).preload('moAccount').preload('facilityType');
        const facilitys = await facilityQuery.paginate(page, limit);
        return facilitys;
    }
    async allByProject(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const facilityQuery = Facility_1.default.query().where('project_id', project.id).preload('moAccount').preload('facilityType');
        const facilitys = await facilityQuery.paginate(page, limit);
        return facilitys;
    }
    async destroyByIdByUnit(id, unit) {
        const facility = await this.findByIdByUnit(id, unit);
        await facility.delete();
        return true;
    }
    async findByIdByUnitAndUpdate(id, unit, data) {
        const facility = await this.findByIdByUnit(id, unit);
        facility.facilityTypeId = data.facilityTypeId ?? facility.facilityTypeId;
        facility.dateFrom = data.dateFrom ?? facility.dateFrom;
        facility.dateTo = data.dateTo ?? facility.dateTo;
        facility.fromTime = data.fromTime ?? facility.fromTime;
        facility.toTime = data.toTime ?? facility.toTime;
        facility.bankOption = data.bankOption ?? facility.bankOption;
        facility.gatheringDescription = data.gatheringDescription ?? facility.gatheringDescription;
        facility.payment = data.payment ?? facility.payment;
        facility.bankName = data.bankName ?? facility.bankName;
        facility.transactionNumber = data.transactionNumber ?? facility.transactionNumber;
        facility.amount = data.amount ?? facility.amount;
        facility.moAccountId = data.moAccountId ?? facility.moAccountId;
        facility.chequeNo = data.chequeNo ?? facility.chequeNo;
        await facility.save();
        if (facility.moAccountId) {
            await facility.load('moAccount');
        }
        await facility.load('facilityType');
        return facility;
    }
    async findByIdByProjectAndUpdate(id, project, data) {
        const facility = await this.findByIdByProject(id, project);
        facility.facilityTypeId = data.facilityTypeId ?? facility.facilityTypeId;
        facility.dateFrom = data.dateFrom ?? facility.dateFrom;
        facility.dateTo = data.dateTo ?? facility.dateTo;
        facility.gatheringDescription = data.gatheringDescription ?? facility.gatheringDescription;
        facility.payment = data.payment ?? facility.payment;
        facility.bankName = data.bankName ?? facility.bankName;
        facility.transactionNumber = data.transactionNumber ?? facility.transactionNumber;
        facility.amount = data.amount ?? facility.amount;
        facility.moAccountId = data.moAccountId ?? facility.moAccountId;
        facility.status = data.status ?? facility.status;
        await facility.save();
        if (facility.moAccountId) {
            await facility.load('moAccount');
        }
        await facility.load('facilityType');
        return facility;
    }
    async findByIdByUnit(id, unit) {
        const facility = await Facility_1.default.query().preload('moAccount').preload('facilityType').where('unit_id', unit.id).where('id', id).firstOrFail();
        return facility;
    }
    async findByIdByProject(id, project) {
        const facility = await Facility_1.default.query().preload('moAccount').preload('facilityType').preload('user').where('project_id', project.id).where('id', id).firstOrFail();
        return facility;
    }
}
exports.default = FacilityRepository;
//# sourceMappingURL=FacilityRepository.js.map