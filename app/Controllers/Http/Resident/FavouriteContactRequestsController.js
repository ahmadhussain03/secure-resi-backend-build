"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const FavouriteContactRequest_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/FavouriteContactRequest"));
class FavouriteContactRequestsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const requests = await FavouriteContactRequest_1.default.query().where('user_id', authUser.id).preload('favourite', query => query.preload('resident').preload('profile')).paginate(page, limit);
        return response.json(requests);
    }
    async search({ request, response, auth }) {
        const { code } = request.params();
        const authUser = auth.user;
        const user = await User_1.default.query().whereHas('resident', query => query.where('code', code))
            .whereDoesntHave('favouriteRequests', (query) => query.whereColumn('users.id', 'favourite_id'))
            .whereDoesntHave('favouriteContacts', (query) => query.whereColumn('users.id', 'favourite_id'))
            .whereNot('id', authUser.id)
            .preload('resident').preload('profile')
            .firstOrFail();
        return response.json(user);
    }
    async create({ request, response, auth }) {
        const { code } = request.params();
        const authUser = auth.user;
        const user = await User_1.default.query()
            .whereHas('resident', query => query.where('code', code))
            .whereDoesntHave('favouriteRequests', (query) => query.whereColumn('users.id', 'favourite_id'))
            .whereDoesntHave('favouriteContacts', (query) => query.whereColumn('users.id', 'favourite_id'))
            .whereNot('id', authUser.id)
            .firstOrFail();
        await FavouriteContactRequest_1.default.create({
            userId: auth.user?.id,
            favouriteId: user.id
        });
        return response.json({ message: 'Favourite Contact Request Sent!' });
    }
}
exports.default = FavouriteContactRequestsController;
//# sourceMappingURL=FavouriteContactRequestsController.js.map