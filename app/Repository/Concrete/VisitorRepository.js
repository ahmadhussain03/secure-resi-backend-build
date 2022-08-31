"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Visitor_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Visitor"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class VisitorRepository {
    async create(data, request) {
        const visitor = await Visitor_1.default.create({
            name: data.name,
            gender: data.gender,
            phone: data.phone,
            email: data.email,
            registrationNo: data.registration_no,
            registrationDocument: data.registration_document,
            nationality: data.nationality,
            dob: data.dob,
            projectId: data.projectId,
            userId: data.userId,
            unitId: data.unitId,
            cityId: data.city,
            stateId: data.state,
            countryId: data.country,
            address: data.address,
            postCode: data.postCode,
            addedBy: data.addedBy,
        });
        const idCard = request.file('idCard');
        if (idCard) {
            const fileName = `${visitor.id.toString()}.${idCard.extname}`;
            await idCard.move(Application_1.default.tmpPath(`visitor/idCard/${visitor.id}`), {
                name: fileName
            });
            visitor.idCard = fileName;
            await visitor.save();
        }
        const image = request.file('image');
        if (image) {
            const fileName = `${visitor.id.toString()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`visitor/image`), {
                name: fileName
            });
            visitor.image = fileName;
            await visitor.save();
        }
        const document = request.file('document');
        if (document) {
            const fileName = `${visitor.id.toString()}.${document.extname}`;
            await document.move(Application_1.default.tmpPath(`visitor/document/${visitor.id}`), {
                name: fileName
            });
            visitor.document = fileName;
            await visitor.save();
        }
        await visitor.load('city');
        await visitor.load('country');
        await visitor.load('state');
        return visitor;
    }
    async allByUnit(request, unit) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const visitorsQuery = Visitor_1.default.query().where('unit_id', unit.id).preload('city').preload('country').preload('state');
        const visitors = await visitorsQuery.paginate(page, limit);
        return visitors;
    }
    async allByProject(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const addedBy = query.addedBy;
        let unit = query.unit || null;
        const visitorsQuery = Visitor_1.default.query().where('project_id', project.id).preload('city').preload('country').preload('state').preload('unit');
        if (unit) {
            visitorsQuery.where('unit_id', unit);
        }
        if (addedBy) {
            visitorsQuery.where('added_by', addedBy);
        }
        const visitors = await visitorsQuery.paginate(page, limit);
        return visitors;
    }
    async destroyByIdByUnit(id, unit) {
        const visitor = await this.findByIdByUnit(id, unit);
        await visitor.delete();
        return true;
    }
    async destroyByIdByProject(id, project) {
        const visitor = await this.findByIdByProject(id, project);
        await visitor.delete();
        return true;
    }
    async findByIdByUnitAndUpdate(id, unit, data) {
        const visitor = await this.findByIdByUnit(id, unit);
        visitor.name = data.name ?? visitor.name;
        visitor.email = data.email ?? visitor.email;
        visitor.registrationNo = data.registration_no ?? visitor.registrationNo;
        visitor.registrationDocument = data.registration_document ?? visitor.registrationDocument;
        visitor.nationality = data.nationality ?? visitor.nationality;
        visitor.dob = data.dob ?? visitor.dob;
        visitor.phone = data.phone ?? visitor.phone;
        visitor.gender = data.gender ?? visitor.gender;
        visitor.cityId = data.city ?? visitor.cityId;
        visitor.stateId = data.state ?? visitor.stateId;
        visitor.countryId = data.country ?? visitor.countryId;
        visitor.address = data.address ?? visitor.address;
        visitor.postCode = data.postCode ?? visitor.postCode;
        await visitor.save();
        await visitor.load('city');
        await visitor.load('country');
        await visitor.load('state');
        return visitor;
    }
    async findByIdByProjectAndUpdate(id, project, data) {
        const visitor = await this.findByIdByProject(id, project);
        visitor.name = data.name ?? visitor.name;
        visitor.email = data.email ?? visitor.email;
        visitor.registrationNo = data.registration_no ?? visitor.registrationNo;
        visitor.registrationDocument = data.registration_document ?? visitor.registrationDocument;
        visitor.nationality = data.nationality ?? visitor.nationality;
        visitor.dob = data.dob ?? visitor.dob;
        visitor.phone = data.phone ?? visitor.phone;
        visitor.gender = data.gender ?? visitor.gender;
        visitor.cityId = data.city ?? visitor.cityId;
        visitor.stateId = data.state ?? visitor.stateId;
        visitor.countryId = data.country ?? visitor.countryId;
        visitor.address = data.address ?? visitor.address;
        visitor.postCode = data.postCode ?? visitor.postCode;
        await visitor.save();
        await visitor.load('city');
        await visitor.load('country');
        await visitor.load('state');
        return visitor;
    }
    async findByIdByUnit(id, unit) {
        const visitor = await Visitor_1.default.query().where('unit_id', unit.id).where('id', id).firstOrFail();
        return visitor;
    }
    async findByIdByProject(id, project) {
        const visitor = await Visitor_1.default.query().where('project_id', project.id).where('id', id).firstOrFail();
        return visitor;
    }
}
exports.default = VisitorRepository;
//# sourceMappingURL=VisitorRepository.js.map