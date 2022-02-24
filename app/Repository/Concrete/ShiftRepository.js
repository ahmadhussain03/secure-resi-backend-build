"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shift_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Shift"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const InvalidCredentialException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/InvalidCredentialException"));
const luxon_1 = require("luxon");
class ShiftRepository {
    async create(data) {
        const from = await User_1.default.query().whereHas('items', (query) => {
            query.whereIn('id', data.assignedItems);
        }).where('id', data.from).preload('items').firstOrFail();
        const isValidPassword = await Hash_1.default.verify(from.password, data.password);
        if (!isValidPassword)
            throw new InvalidCredentialException_1.default();
        const to = await User_1.default.query().where('id', data.to).whereHas('role', (query) => {
            query.where('name', 'guard');
        }).firstOrFail();
        await from.related('items').detach(data.assignedItems);
        await from.load('items');
        await to.related('items').attach(data.assignedItems);
        const shift = await Shift_1.default.create({
            fromId: from.id,
            toId: to.id,
            note: data.note,
            projectId: data.projectId
        });
        const assignItems = data.assignedItems.map(item => {
            return {
                shiftId: shift.id,
                itemId: item
            };
        });
        const notAssignItems = from.items.map(item => {
            return {
                shiftId: shift.id,
                itemId: item.id
            };
        });
        await shift.related('assignItems').createMany(assignItems);
        await shift.related('notAssignItems').createMany(notAssignItems);
        await shift.load('assignItems');
        await shift.load('notAssignItems');
        return shift;
    }
    async all(request, projectId) {
        const query = request.qs();
        const startDate = query.startDate;
        const endDate = query.endDate;
        const from = query.from;
        const to = query.to;
        const shiftQuery = Shift_1.default.query().where('project_id', projectId).preload('from', (query) => query.preload('profile')).preload('to', (query) => query.preload('profile')).orderBy('created_at', 'desc');
        if (startDate) {
            const formattedStartDate = luxon_1.DateTime.fromFormat(query.startDate, 'yyyy-MM-dd', { zone: 'utc' }).toSQL();
            shiftQuery.whereRaw('DATE(created_at) >= ?', [formattedStartDate]);
        }
        if (endDate) {
            const formattedEndDate = luxon_1.DateTime.fromFormat(query.endDate, 'yyyy-MM-dd', { zone: 'utc' }).toSQL();
            shiftQuery.whereRaw('DATE(created_at) <= ?', [formattedEndDate]);
        }
        if (from) {
            shiftQuery.where('from_id', from);
        }
        if (to) {
            shiftQuery.where('to_id', to);
        }
        const shifts = await shiftQuery.exec();
        return shifts;
    }
    async findById(id, projectId) {
        const shift = await Shift_1.default.query().where('project_id', projectId).where('id', id).preload('from').preload('to').preload('assignItems', (query) => {
            query.preload('item');
        }).preload('notAssignItems', (query) => {
            query.preload('item');
        }).firstOrFail();
        return shift;
    }
}
exports.default = ShiftRepository;
//# sourceMappingURL=ShiftRepository.js.map