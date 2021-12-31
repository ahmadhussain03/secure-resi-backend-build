"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsersController {
    async index({ response, auth }) {
        const user = auth.user;
        await user?.load('profile');
        await user?.load('role', (query) => {
            query.preload('permissions', (q) => {
                q.select(['id', 'name', 'slug', 'group']);
            });
        });
        await user?.load('resident', (query) => {
            query.preload('project').preload('units');
        });
        return response.json(user);
    }
    async logout({ auth, response }) {
        const authUser = auth.user;
        authUser.deviceToken = "";
        await authUser.save();
        await auth.use('api').revoke();
        return response.json({ message: "User logout Successfully!" });
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map