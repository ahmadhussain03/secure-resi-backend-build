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
        const reseller = await User_1.default.create({
            username: 'reseller@secure.com',
            password: '@Admin123',
            userType: UserType_1.UserType.reseller
        });
        await reseller.related('profile').create({
            name: 'Reseller',
            mobileNo: '090078601',
            email: 'reseller@secure.com',
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=16_ResellerSeeder.js.map