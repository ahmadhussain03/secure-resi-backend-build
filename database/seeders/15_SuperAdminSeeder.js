"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class default_1 extends Seeder_1.default {
    async run() {
        const superAdmin = await User_1.default.create({
            username: 'super-admin@secure.com',
            password: '@Admin123',
            userType: UserType_1.UserType.super_admin
        });
        await superAdmin.related('profile').create({
            name: 'Super Admin',
            mobileNo: '090078601',
            email: 'super-admin@secure.com',
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=15_SuperAdminSeeder.js.map