"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Role_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Role"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class default_1 extends Seeder_1.default {
    async run() {
        const role = await Role_1.default.firstOrCreate({
            name: 'guard-supervisor',
        });
        await role.related('permissions').detach();
        const guardSupervisorPermissions = [
            'view-staff',
            'create-staff',
            'delete-staff',
            'update-staff',
            'view-role',
            'create-log-type',
            'view-log-type',
            'update-log-type',
            'delete-log-type',
            'create-log-pre-defined-message',
            'view-log-pre-defined-message',
            'update-log-pre-defined-message',
            'delete-log-pre-defined-message',
            'create-operation-type',
            'view-operation-type',
            'update-operation-type',
            'delete-operation-type',
            'create-operation-pre-defined-message',
            'view-operation-pre-defined-message',
            'update-operation-pre-defined-message',
            'delete-operation-pre-defined-message',
            'create-patrol-pre-defined-message',
            'view-patrol-pre-defined-message',
            'update-patrol-pre-defined-message',
            'delete-patrol-pre-defined-message',
            'create-premises-notification',
            'view-premises-notification',
            'update-premises-notification',
            'delete-premises-notification',
            'view-notification',
            'create-log-book',
            'view-log-book',
            'update-log-book',
            'delete-log-book',
            'create-guard-operation',
            'view-guard-operation',
            'update-guard-operation',
            'delete-guard-operation',
            'create-panic-alert',
            'view-panic-alert',
            'delete-panic-alert',
            'create-checkpoint',
            'view-checkpoint',
            'update-checkpoint',
            'delete-checkpoint',
            'create-schedule',
            'view-schedule',
            'update-schedule',
            'delete-schedule',
            'create-patrol-schedule',
            'view-patrol-schedule',
            'update-patrol-schedule',
            'delete-patrol-schedule',
            'create-patrol-entry',
            'view-patrol-entry',
            'create-patrol-schedule-entry',
            'view-patrol-schedule-entry',
            'create-schedule-entry',
            'view-schedule-entry',
            'create-attendance',
            'view-attendance',
            'view-shift',
            'view-emergency-contact',
            'create-emergency-contact',
            'update-emergency-contact',
            'delete-emergency-contact',
            'update-profile',
            'view-unit',
            'create-visitor',
            'view-visitor',
            'update-visitor',
            'delete-visitor',
            'view-parking-slot'
        ];
        const permissions = await Permission_1.default.query().select('id').where('type', UserType_1.UserType.client_staff).whereIn('slug', guardSupervisorPermissions);
        await role.related('permissions').attach(permissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=14_GuardSupervisorPermissionSeeder.js.map