"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PatrolEntryRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PatrolEntryRepositoryContract"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const Checkpoint_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Checkpoint"));
const CreatePatrolEntryValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreatePatrolEntryValidator"));
class PatrolEntriesController {
    async index({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolEntryRepositoryContract_1.default.all(request, projectId);
        return response.json(entries);
    }
    async report({ response, auth, request }) {
        const user = auth.user;
        const projectId = user.clientStaff.projectId;
        const entries = await PatrolEntryRepositoryContract_1.default.all(request, projectId);
        return response.json(entries);
    }
    async store({ response, request, auth }) {
        const data = await request.validate(CreatePatrolEntryValidator_1.default);
        const user = auth.user;
        const project = user.clientStaff.project;
        data.userId = user.id;
        data.projectId = project.id;
        const checkpoint = await Checkpoint_1.default.query().where('project_id', project.id).where('id', data.checkpointId).firstOrFail();
        data.checkpointId = checkpoint.id;
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('patrol_entry/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        if (audio) {
            const fileName = `${(0, Helpers_1.cuid)()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath('patrol_entry/audio'), {
                name: fileName
            });
            data.audio = fileName;
        }
        const entry = await PatrolEntryRepositoryContract_1.default.create(data);
        return response.json(entry.serialize());
    }
}
exports.default = PatrolEntriesController;
//# sourceMappingURL=PatrolEntriesController.js.map