"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ScheduleEntryRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/ScheduleEntryRepositoryContract"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Schedule_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Schedule"));
const CreateScheduleEntryValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateScheduleEntryValidator"));
const ScheduleRoutine_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ScheduleRoutine"));
const luxon_1 = require("luxon");
const ForbiddenException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ForbiddenException"));
class ScheduleEntriesController {
    async index({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await ScheduleEntryRepositoryContract_1.default.all(request, projectId);
        return response.json(entries);
    }
    async store({ response, request, auth }) {
        const data = await request.validate(CreateScheduleEntryValidator_1.default);
        const user = auth.user;
        const project = user.clientStaff.project;
        await Schedule_1.default.query().where('id', data.scheduleId).whereHas('scheduleRoutine', (query) => {
            query.where('checkpoint_id', data.checkpointId);
        }).firstOrFail();
        const routine = await ScheduleRoutine_1.default.query().where('schedule_id', data.scheduleId).where('checkpoint_id', data.checkpointId).firstOrFail();
        if (luxon_1.DateTime.now().toISO() > routine.endTime.toISO()) {
            if (routine.lockTime)
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
            await image.move(Application_1.default.tmpPath('schedule_entry/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        if (audio) {
            const fileName = `${(0, Helpers_1.cuid)()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath('schedule_entry/audio'), {
                name: fileName
            });
            data.audio = fileName;
        }
        const entry = await ScheduleEntryRepositoryContract_1.default.create(data);
        return response.json(entry);
    }
}
exports.default = ScheduleEntriesController;
//# sourceMappingURL=ScheduleEntriesController.js.map