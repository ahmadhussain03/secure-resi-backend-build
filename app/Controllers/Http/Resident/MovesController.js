"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoveRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/MoveRepositoryContract"));
const UnitRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/UnitRepositoryContract"));
const MoAccount_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/MoAccount"));
const CreateMoveValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/CreateMoveValidator"));
const UpdateMoveValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/Resident/UpdateMoveValidator"));
class MovesController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const move = await MoveRepositoryContract_1.default.allByUnit(request, unit);
        return response.json(move);
    }
    async show({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        const id = params.id;
        const move = await MoveRepositoryContract_1.default.findByIdByUnit(id, unit);
        return response.json(move);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(CreateMoveValidator_1.default);
        const unit = await UnitRepositoryContract_1.default.findById(data.unitId, project);
        if (data.moAccountId) {
            await MoAccount_1.default.query().where('id', data.moAccountId).where('project_id', project.id).firstOrFail();
        }
        data.projectId = project.id;
        data.userId = authUser.id;
        data.unitId = unit.id;
        const move = await MoveRepositoryContract_1.default.create(data);
        return response.json(move);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const data = await request.validate(UpdateMoveValidator_1.default);
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        if (data.moAccountId) {
            await MoAccount_1.default.query().where('id', data.moAccountId).where('project_id', project.id).firstOrFail();
        }
        const move = await MoveRepositoryContract_1.default.findByIdByUnitAndUpdate(params.id, unit, data);
        return response.json(move);
    }
    async destroy({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser?.resident.project;
        const query = request.qs();
        const unit = await UnitRepositoryContract_1.default.findById(query.unit ?? 0, project);
        await MoveRepositoryContract_1.default.destroyByIdByUnit(params.id, unit);
        return response.json({ message: "Move Deleted Successfully" });
    }
}
exports.default = MovesController;
//# sourceMappingURL=MovesController.js.map