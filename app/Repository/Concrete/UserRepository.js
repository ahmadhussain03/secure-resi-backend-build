"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
class UserRepository {
    async getUserById(userId, preload) {
        const user = await User_1.default.query().where('id', userId).firstOrFail();
        console.log(preload);
        return user;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map