"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const ClientStaff_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ClientStaff"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const Profile_1 = __importDefault(require("../../app/Models/Profile"));
class UserSeeder extends Seeder_1.default {
    async run() {
        await User_1.default.query().delete();
        await ClientStaff_1.default.query().delete();
        await Profile_1.default.query().delete();
        await User_1.default.createMany([
            {
                username: 'admin@secure.com',
                password: 'admin123',
                userType: UserType_1.UserType.admin
            },
            {
                username: 'client@secure.com',
                password: 'admin123',
                userType: UserType_1.UserType.client,
                parentId: 1
            },
            {
                username: 'client-postman@secure.com',
                password: 'admin123',
                userType: UserType_1.UserType.client,
                parentId: 1
            }
        ]);
        await Profile_1.default.create({
            name: 'Postman Client',
            mobileNo: '03002488',
            email: 'client@secure.com',
            userId: 2
        });
        await Profile_1.default.create({
            name: 'Postman Client',
            mobileNo: '03002488',
            email: 'client-postman@secure.com',
            userId: 3
        });
    }
}
exports.default = UserSeeder;
//# sourceMappingURL=1_User.js.map