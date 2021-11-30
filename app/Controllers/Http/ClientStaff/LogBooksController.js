"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogBookRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/LogBookRepositoryContract"));
const CreateLogBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateLogBookValidator"));
const UpdateLogBookValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateLogBookValidator"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
class LogBooksController {
    async index({ request, response, auth }) {
        const project = auth.user?.clientStaff.project;
        const logs = await LogBookRepositoryContract_1.default.all(request, project);
        return response.json(logs);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const data = await request.validate(CreateLogBookValidator_1.default);
        data.projectId = projectId;
        data.userId = authUser.id;
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('log_book/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        if (audio) {
            const fileName = `${(0, Helpers_1.cuid)()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath('log_book/audio'), {
                name: fileName
            });
            data.audio = fileName;
        }
        const log = await LogBookRepositoryContract_1.default.create(data);
        return response.json(log);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(UpdateLogBookValidator_1.default);
        const image = request.file('image');
        const audio = request.file('audio');
        if (image) {
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath('log_book/images'), {
                name: fileName
            });
            data.image = fileName;
        }
        if (audio) {
            const fileName = `${(0, Helpers_1.cuid)()}.${audio.extname}`;
            await audio.move(Application_1.default.tmpPath('log_book/audio'), {
                name: fileName
            });
            data.audio = fileName;
        }
        const log = await LogBookRepositoryContract_1.default.findByIdAndUpdate(params.id, project, data);
        return response.json(log);
    }
    async destroy({ response, params, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        await LogBookRepositoryContract_1.default.destroyById(params.id, project);
        return response.json({ message: 'Log Book Deleted Successfully' });
    }
}
exports.default = LogBooksController;
//# sourceMappingURL=LogBooksController.js.map