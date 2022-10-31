"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.group(() => {
    Route_1.default.post('/login', 'LoginController.index');
    Route_1.default.group(() => {
        Route_1.default.any('/user', 'UsersController.index');
        Route_1.default.post('/logout', 'UsersController.logout');
    }).middleware('auth');
}).namespace('App/Controllers/Http/Reseller').prefix('api/reseller');
//# sourceMappingURL=reseller.js.map