"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolScheduleEntryRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PatrolScheduleEntryRepositoryContract"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const ForbiddenException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ForbiddenException"));
const PatrolSchedule_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PatrolSchedule"));
const CreatePatrolScheduleEntryValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreatePatrolScheduleEntryValidator"));
const luxon_1 = require("luxon");
class PatrolScheduleEntriesController {
    async index({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolScheduleEntryRepositoryContract_1.default.all(request, projectId);
        return response.json(entries);
    }
    async report({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolScheduleEntryRepositoryContract_1.default.all(request, projectId);
        return response.json(entries);
    }
    async show({ request, response, auth, params }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolScheduleEntryRepositoryContract_1.default.searchByPatrolScheduleId(request, params.id, projectId);
        return response.json(entries);
    }
    async store({ response, request, auth }) {
        const data = await request.validate(CreatePatrolScheduleEntryValidator_1.default);
        const user = auth.user;
        const project = user.clientStaff.project;
        const patrolSchedule = await PatrolSchedule_1.default.query().where('id', data.patrolScheduleId).whereHas('checkpoints', (query) => {
            query.where('checkpoints.id', data.checkpointId);
        }).preload('patrolScheduleRoutine').firstOrFail();
        if (luxon_1.DateTime.now().toISO() > patrolSchedule.patrolScheduleRoutine.endTime.toISO()) {
            if (patrolSchedule.patrolScheduleRoutine.lockTime)
                throw new ForbiddenException_1.default();
            data.status = 'After Time';
        }
        else {
            data.status = 'On Time';
        }
        data.userId = user.id;
        data.projectId = project.id;
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('patrol_schedule_entry/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        if (audio) {
            const fileName = `${(0, Helpers_1.cuid)()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath('patrol_schedule_entry/audio'), {
                name: fileName
            });
            data.audio = fileName;
        }
        const entry = await PatrolScheduleEntryRepositoryContract_1.default.create(data);
        return response.json(entry);
    }
}
exports.default = PatrolScheduleEntriesController;
//# sourceMappingURL=PatrolScheduleEntriesController.js.map