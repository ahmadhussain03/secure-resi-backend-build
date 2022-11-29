"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
class default_1 extends Seeder_1.default {
    async run() {
        const removePermissions = [
            'create-attendance',
            'view-attendance',
            'view-panic-alert',
            'delete-panic-alert',
            'create-patrol-entry',
            'view-patrol-entry',
            'view-patrol-schedule-entry',
            'create-patrol-schedule-entry',
            'create-schedule-entry',
            'view-schedule-entry',
            'move-tnc',
            'facility-tnc',
            'view-shift'
        ];
        await Permission_1.default.query().whereIn('slug', removePermissions).delete();
        const notificationPermissions = await Permission_1.default.query().where('slug', 'view-notification').first();
        if (notificationPermissions) {
            notificationPermissions.name = 'View General Notifications';
            await notificationPermissions.save();
        }
        const createFacilityPermission = await Permission_1.default.query().where('slug', 'create-tnc').first();
        if (createFacilityPermission) {
            createFacilityPermission.name = 'Create Facility Term & Conditions';
            await createFacilityPermission.save();
        }
        const viewFacilityPermission = await Permission_1.default.query().where('slug', 'view-tnc').first();
        if (viewFacilityPermission) {
            viewFacilityPermission.name = 'View Facility Term & Conditions';
            await viewFacilityPermission.save();
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=22_RemoveUnusedPermission.js.map