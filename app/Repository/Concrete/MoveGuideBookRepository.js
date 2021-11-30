"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoveGuideBook_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/MoveGuideBook"));
class MoveGuideBookRepository {
    async findById(id, project) {
        const guideBook = await MoveGuideBook_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return guideBook;
    }
    async findByIdAndUpdate(id, data, project) {
        const guideBook = await MoveGuideBook_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        guideBook.description = data.description ? data.description : guideBook.description;
        await guideBook.save();
        return guideBook;
    }
    async destroyById(id, project) {
        const guideBook = await MoveGuideBook_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        await guideBook?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page ?? 1;
        const limit = query.limit ?? 15;
        return await MoveGuideBook_1.default.query().where('project_id', project.id).paginate(page, limit);
    }
    async create(data) {
        return await MoveGuideBook_1.default.create({
            description: data.description,
            projectId: data.projectId
        });
    }
}
exports.default = MoveGuideBookRepository;
//# sourceMappingURL=MoveGuideBookRepository.js.map