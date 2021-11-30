"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ResidentPanicAlert_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResidentPanicAlert"));
const ResidentPanicAlertComment_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ResidentPanicAlertComment"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
class ResidentPanicAlertRepository {
    async create(data) {
        const alert = await ResidentPanicAlert_1.default.create({
            userId: data.userId,
            projectId: data.projectId,
            unitId: data.unitId
        });
        return alert;
    }
    async allByUser(request, user) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const alertsQuery = ResidentPanicAlert_1.default.query().preload('user', (query) => query.preload('profile').preload('resident')).where('user_id', user.id);
        const alerts = await alertsQuery.paginate(page, limit);
        return alerts;
    }
    async allByUnit(request, unit) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const alertsQuery = ResidentPanicAlert_1.default.query().preload('user', (query) => query.preload('profile').preload('resident')).where('unit_id', unit.id);
        const alerts = await alertsQuery.paginate(page, limit);
        return alerts;
    }
    async destroyByIdByUser(id, user) {
        const alert = await this.findByIdByUser(id, user);
        await alert.delete();
        return true;
    }
    async destroyByIdByUnit(id, unit) {
        const alert = await this.findByIdByUnit(id, unit);
        await alert.delete();
        return true;
    }
    async findByIdByUserAndUpdate(id, user, data, request) {
        const alert = await this.findByIdByUser(id, user);
        const comment = new ResidentPanicAlertComment_1.default();
        comment.comment = data.comment;
        data.userId = comment.userId;
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${comment.id.toString()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`comment/image`), {
                name: fileName
            });
            comment.image = fileName;
        }
        if (audio) {
            const fileName = `${comment.id.toString()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath(`comment/audio`), {
                name: fileName
            });
            comment.audio = fileName;
        }
        await alert.related('comments').save(comment);
        await alert.load('comments');
        return alert;
    }
    async findByIdByUnitAndUpdate(id, unit, data, request) {
        const alert = await this.findByIdByUnit(id, unit);
        const comment = new ResidentPanicAlertComment_1.default();
        comment.comment = data.comment;
        comment.userId = data.userId;
        await alert.related('comments').save(comment);
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${comment.id.toString()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`comment/image`), {
                name: fileName
            });
            comment.image = fileName;
        }
        if (audio) {
            const fileName = `${comment.id.toString()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath(`comment/audio`), {
                name: fileName
            });
            comment.audio = fileName;
        }
        await alert.related('comments').save(comment);
        await alert.load('comments', (query) => query.where('id', comment.id).preload('user', q => q.preload('resident').preload('profile')));
        return alert;
    }
    async findByIdByUser(id, user) {
        const alert = await ResidentPanicAlert_1.default.query().preload('comments', (query) => query.orderBy('created_at', 'desc').preload('user', q => q.preload('resident').preload('profile'))).where('user_id', user.id).where('id', id).firstOrFail();
        return alert;
    }
    async findByIdByUnit(id, unit) {
        const alert = await ResidentPanicAlert_1.default.query().preload('comments', (query) => query.orderBy('created_at', 'desc').preload('user', q => q.preload('resident').preload('profile'))).where('unit_id', unit.id).where('id', id).firstOrFail();
        return alert;
    }
}
exports.default = ResidentPanicAlertRepository;
//# sourceMappingURL=ResidentPanicAlertRepository.js.map