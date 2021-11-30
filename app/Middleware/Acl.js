"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ForbiddenException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/ForbiddenException"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
class Acl {
    async handle({ auth }, next, allowedPermissions) {
        const user = auth.user;
        await user.load('role', (query) => {
            query.preload('permissions', (query) => query.select(['slug', 'group']));
        });
        if (user.role && user.role.permissions) {
            const permissions = user.role.permissions.map(permission => permission.slug);
            const found = permissions.some(permission => allowedPermissions.indexOf(permission) >= 0);
            if (!found) {
                throw new ForbiddenException_1.default();
            }
        }
        else {
            throw new ForbiddenException_1.default();
        }
        if (user.userType == UserType_1.UserType.client_staff) {
            await user.load('clientStaff', (query) => {
                query.preload('project');
            });
        }
        else if (user.userType == UserType_1.UserType.resident) {
            await user.load('resident', (query) => {
                query.preload('project').preload('units');
            });
        }
        await next();
    }
}
exports.default = Acl;
//# sourceMappingURL=Acl.js.map