"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
class default_1 extends Seeder_1.default {
    async run() {
        const role = await Role_1.default.firstOrCreate({
            name: 'gps-admin'
        });
        const permissions = [
            'view-staff',
            'create-staff',
            'delete-staff',
            'update-staff',
            'view-checkpoint',
            'create-checkpoint',
            'delete-checkpoint',
            'update-checkpoint',
            'view-schedule',
            'create-schedule',
            'delete-schedule',
            'update-schedule',
            'view-patrol-schedule',
            'create-patrol-schedule',
            'delete-patrol-schedule',
            'update-patrol-schedule',
            'view-patrol-pre-defined-message',
            'create-patrol-pre-defined-message',
            'delete-patrol-pre-defined-message',
            'update-patrol-pre-defined-message',
            'view-guard-operation',
            'create-guard-operation',
            'delete-guard-operation',
            'update-guard-operation',
            'view-operation-type',
            'create-operation-type',
            'delete-operation-type',
            'update-operation-type',
            'view-operation-pre-defined-message',
            'create-operation-pre-defined-message',
            'delete-operation-pre-defined-message',
            'update-operation-pre-defined-message',
            'view-log-book',
            'create-log-book',
            'delete-log-book',
            'update-log-book',
            'view-log-type',
            'create-log-type',
            'delete-log-type',
            'update-log-type',
            'view-log-pre-defined-message',
            'create-log-pre-defined-message',
            'delete-log-pre-defined-message',
            'update-log-pre-defined-message',
            'view-guard-item',
            'create-guard-item',
            'delete-guard-item',
            'update-guard-item',
            'assign-guard-item',
            'report-guard-item',
            'report-guard-operation',
            'report-log-book',
            'report-patrol-entry',
            'report-patrol-schedule-entry',
            'report-quick-schedule-patrol',
            'report-schedule-entry',
            'report-attendance',
            'report-shift',
            'report-panic-alert',
            'create-attendance',
            'view-attendance',
            'view-shift',
            'create-panic-alert',
            'view-panic-alert',
            'delete-panic-alert',
            'create-premises-notification',
            'view-premises-notification',
            'update-premises-notification',
            'delete-premises-notification',
            'view-notification',
            'view-emergency-contact',
            'create-emergency-contact',
            'update-emergency-contact',
            'delete-emergency-contact',
            'update-profile'
        ];
        const dbPermissions = await Permission_1.default.query().whereIn('slug', permissions);
        const allPermissions = dbPermissions.map(permission => permission.id);
        await role.related('permissions').attach(allPermissions);
    }
}
exports.default = default_1;
//# sourceMappingURL=21_GpsAdminPermissionSeeder.js.map