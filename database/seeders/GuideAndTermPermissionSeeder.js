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
        const guidePermissions = await Permission_1.default.createMany([
            {
                name: 'Create Move Guide Book',
                slug: 'create-move-guide-book',
                type: UserType_1.UserType.client_staff,
                group: 'move_guide_book'
            },
            {
                name: 'View Move Guide Book',
                slug: 'view-move-guide-book',
                type: UserType_1.UserType.client_staff,
                group: 'move_guide_book'
            },
            {
                name: 'Create Move Term & Conditions',
                slug: 'create-move-tnc',
                type: UserType_1.UserType.client_staff,
                group: 'move_tnc'
            },
            {
                name: 'View Move Term & Conditions',
                slug: 'view-move-tnc',
                type: UserType_1.UserType.client_staff,
                group: 'move_tnc'
            },
            {
                name: 'Create Term & Conditions',
                slug: 'create-tnc',
                type: UserType_1.UserType.client_staff,
                group: 'tnc'
            },
            {
                name: 'View Term & Conditions',
                slug: 'view-tnc',
                type: UserType_1.UserType.client_staff,
                group: 'tnc'
            },
        ]);
        await role.related('permissions').attach(guidePermissions.map(permission => permission.id));
    }
}
exports.default = default_1;
//# sourceMappingURL=GuideAndTermPermissionSeeder.js.map