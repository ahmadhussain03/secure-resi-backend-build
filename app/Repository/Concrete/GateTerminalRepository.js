"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GateTerminal_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/GateTerminal"));
class GateTerminalRepository {
    async allByProjectCode(request, code) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const gateTerminalQuery = GateTerminal_1.default.query().whereHas('project', (query) => query.where('code', code));
        return await gateTerminalQuery.paginate(page, limit);
    }
    async create(data) {
        const gateTerminal = await GateTerminal_1.default.create(data);
        return gateTerminal;
    }
    async all(request, project) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const gateTerminalQuery = GateTerminal_1.default.query().where('project_id', project.id);
        if (query.name) {
            gateTerminalQuery.where('name', query.name);
        }
        return await gateTerminalQuery.paginate(page, limit);
    }
    async destroyById(id, project) {
        const gateTerminal = await this.findById(id, project);
        await gateTerminal.delete();
        return true;
    }
    async findByIdAndUpdate(id, data, project) {
        const gateTerminal = await this.findById(id, project);
        gateTerminal.status = data.status ?? gateTerminal.status;
        gateTerminal.name = data.name ?? gateTerminal.name;
        return await gateTerminal.save();
    }
    async findById(id, project) {
        const gateTerminal = await GateTerminal_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return gateTerminal;
    }
}
exports.default = GateTerminalRepository;
//# sourceMappingURL=GateTerminalRepository.js.map