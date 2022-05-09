"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PanicAlert_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/PanicAlert"));
const luxon_1 = require("luxon");
class PanicAlertRepository {
    async create(data) {
        const alert = await PanicAlert_1.default.create({
            userId: data.userId,
            projectId: data.projectId
        });
        await alert.load('project');
        await alert.load('user');
        return alert;
    }
    async all(request, project) {
        const query = request.qs();
        const startDate = query.startDate;
        const endDate = query.endDate;
        const filter = query.filter;
        const sort = query.sort || 'desc';
        const guard = query.guard;
        const alertQuery = PanicAlert_1.default.query().where('project_id', project.id);
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd', { zone: 'Asia/Kuala_Lumpur' }).toUTC().toFormat('yyyy-MM-dd');
            alertQuery.whereRaw('DATE(created_at) >= ?', [formattedStartDate]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd', { zone: 'Asia/Kuala_Lumpur' }).toUTC().toFormat('yyyy-MM-dd');
            alertQuery.whereRaw('DATE(created_at) <= ?', [formattedEndDate]);
        }
        if (filter) {
            if (filter == 'today') {
                const todayDateNumber = luxon_1.DateTime.now().toFormat('dd');
                alertQuery.whereRaw('EXTRACT(DAY FROM created_at) = ?', [todayDateNumber]);
            }
            else if (filter == 'yesterday') {
                const yesterdayDateNumber = luxon_1.DateTime.now().minus({ days: 1 }).toFormat('dd');
                alertQuery.whereRaw('EXTRACT(DAY FROM created_at) = ?', [yesterdayDateNumber]);
            }
            else if (filter == 'week') {
                const weekDay = luxon_1.DateTime.now().weekday;
                const weekStartDate = luxon_1.DateTime.now().minus({ days: weekDay });
                const weekEndDate = weekStartDate.plus({ days: 7 });
                alertQuery.whereRaw('DATE(created_at) >= ?', [weekStartDate.toFormat('yyyy-MM-dd')]);
                alertQuery.whereRaw('DATE(created_at) <= ?', [weekEndDate.toFormat('yyyy-MM-dd')]);
            }
        }
        if (guard) {
            alertQuery.where('user_id', guard);
        }
        if (sort == 'desc') {
            alertQuery.orderBy('created_at', sort);
        }
        alertQuery.preload('user', (query) => query.preload('profile').preload('clientStaff').preload('role')).preload('project');
        if (request.url().split('/')[2] === 'guard') {
            let page = query.page ? parseInt(query.page) : 1;
            let limit = query.limit ? parseInt(query.limit) : 15;
            return await alertQuery.paginate(page, limit);
        }
        else {
            return await alertQuery.exec();
        }
    }
    async destroyById(id, project) {
        const alert = await this.findById(id, project);
        await alert.delete();
        return true;
    }
    async findById(id, project) {
        return await PanicAlert_1.default.query().where('project_id', project.id).where('id', id).preload('user').preload('project').firstOrFail();
    }
}
exports.default = PanicAlertRepository;
//# sourceMappingURL=PanicAlertRepository.js.map