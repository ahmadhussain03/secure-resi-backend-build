"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Improvement_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Improvement"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class ImprovementRepository {
    async create(data, request) {
        const improvement = await Improvement_1.default.create({
            improvement: data.improvement,
            improvementTypeId: data.improvementTypeId,
            projectId: data.projectId,
            status: data.status,
            userId: data.userId,
            unitId: data.unitId
        });
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${improvement.id.toString()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`improvement/image`), {
                name: fileName
            });
            improvement.image = fileName;
            await improvement.save();
        }
        if (audio) {
            const fileName = `${improvement.id.toString()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath(`improvement/audio`), {
                name: fileName
            });
            improvement.audio = fileName;
            await improvement.save();
        }
        return improvement;
    }
    async allByUnit(request, unit) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const improvementsQuery = Improvement_1.default.query().where('unit_id', unit.id).preload('improvementType').preload('user').preload('unit');
        const improvements = await improvementsQuery.paginate(page, limit);
        return improvements;
    }
    async allByProduct(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const improvementsQuery = Improvement_1.default.query().where('project_id', project.id).preload('improvementType').preload('user').preload('unit');
        const improvements = await improvementsQuery.paginate(page, limit);
        return improvements;
    }
    async destroyByIdByUnit(id, unit) {
        const visitor = await this.findByIdByUnit(id, unit);
        await visitor.delete();
        return true;
    }
    async findByIdByUnitAndUpdate(id, unit, data) {
        const improvement = await this.findByIdByUnit(id, unit);
        improvement.improvement = data.improvement ?? improvement.improvement;
        improvement.status = data.status ?? improvement.status;
        improvement.improvementTypeId = data.improvementTypeId ?? improvement.improvementTypeId;
        await improvement.save();
        return improvement;
    }
    async findByIdByUnit(id, unit) {
        const improvement = await Improvement_1.default.query().where('unit_id', unit.id).where('id', id).firstOrFail();
        return improvement;
    }
    async findByIdByProjectAndUpdate(id, project, data) {
        const improvement = await this.findByIdByProject(id, project);
        improvement.improvement = data.improvement ?? improvement.improvement;
        improvement.status = data.status ?? improvement.status;
        improvement.improvementTypeId = data.improvementTypeId ?? improvement.improvementTypeId;
        await improvement.save();
        return improvement;
    }
    async findByIdByProject(id, project) {
        const improvement = await Improvement_1.default.query().where('project_id', project.id).where('id', id).preload('user').firstOrFail();
        return improvement;
    }
}
exports.default = ImprovementRepository;
//# sourceMappingURL=ImprovementRepository.js.map