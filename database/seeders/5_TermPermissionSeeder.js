"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Permission_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Permission"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class default_1 extends Seeder_1.default {
    async run() {
        await Permission_1.default.create({
            name: 'Move Term & Condition',
            slug: 'move-tnc',
            group: 'move',
            type: UserType_1.UserType.client_staff
        });
        await Permission_1.default.create({
            name: 'Facility Term & Condition',
            slug: 'facility-tnc',
            group: 'facility',
            type: UserType_1.UserType.client_staff
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=5_TermPermissionSeeder.js.map