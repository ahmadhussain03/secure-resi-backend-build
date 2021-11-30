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
        return response.json(user);
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map