"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MoAccount_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/MoAccount"));
class MoAccountRepository {
    async findById(id, project) {
        const moAccount = await MoAccount_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        return moAccount;
    }
    async findByIdAndUpdate(id, data, project) {
        const moAccount = await MoAccount_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        moAccount.accountNo = data.accountNo ? data.accountNo : moAccount.accountNo;
        await moAccount.save();
        return moAccount;
    }
    async destroyById(id, project) {
        const moAccount = await MoAccount_1.default.query().where('id', id).where('project_id', project.id).firstOrFail();
        await moAccount?.delete();
        return true;
    }
    async all(request, project) {
        const query = request.qs();
        const page = query.page;
        const limit = query.limit;
        const accounts = await MoAccount_1.default.query().where('project_id', project.id).paginate(page, limit);
        return accounts;
    }
    async create(data) {
        return await MoAccount_1.default.create({
            accountNo: data.accountNo,
            projectId: data.projectId
        });
    }
}
exports.default = MoAccountRepository;
//# sourceMappingURL=MoAccountRepository.js.map