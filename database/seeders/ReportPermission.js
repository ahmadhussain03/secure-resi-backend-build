"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class default_1 extends Seeder_1.default {
    async run() {
        const role = await Role_1.default.query().where('name', 'guard').firstOrFail();
        const reportPermissions = await Permission_1.default.createMany([
            {
                name: 'Patrol Report',
                slug: 'report-patrol-entry',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_entry'
            },
            {
                name: 'Patrol Schedule Report',
                slug: 'report-patrol-schedule-entry',
                type: UserType_1.UserType.client_staff,
                group: 'patrol_schedule_entry'
            },
            {
                name: 'Schedule Report',
                slug: 'report-schedule-entry',
                type: UserType_1.UserType.client_staff,
                group: 'schedule_entry'
            },
            {
                name: 'Attendance Report',
                slug: 'report-attendance',
                type: UserType_1.UserType.client_staff,
                group: 'attendance'
            },
            {
                name: 'Log Book Report',
                slug: 'report-log-book',
                type: UserType_1.UserType.client_staff,
                group: 'log_book'
            },
            {
                name: 'Shift Report',
                slug: 'report-shift',
                type: UserType_1.UserType.client_staff,
                group: 'shift'
            },
            {
                name: 'Panic Alert Report',
                slug: 'report-panic-alert',
                type: UserType_1.UserType.client_staff,
                group: 'panic_alert'
            },
            {
                name: 'Guard Operation Report',
                slug: 'report-guard-operation',
                type: UserType_1.UserType.client_staff,
                group: 'guard_operation'
            },
            {
                name: 'Guard Items Report',
                slug: 'report-guard-item',
                type: UserType_1.UserType.client_staff,
                group: 'guard_items'
            },
        ]);
        await role.related('permissions').attach(reportPermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=ReportPermission.js.map