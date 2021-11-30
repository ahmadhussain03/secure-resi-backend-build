"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FavouriteContact_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/FavouriteContact"));
const FavouriteContactRequest_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/FavouriteContactRequest"));
class FavouriteContactsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const requests = await FavouriteContact_1.default.query().where('user_id', authUser.id).preload('favourite', query => query.preload('resident').preload('profile')).paginate(page, limit);
        return response.json(requests);
    }
    async received({ request, response, auth }) {
        const authUser = auth.user;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const requests = await FavouriteContactRequest_1.default.query().where('favourite_id', authUser.id).preload('user', query => query.preload('resident').preload('profile')).paginate(page, limit);
        return response.json(requests);
    }
    async accept({ request, response, auth }) {
        const authUser = auth.user;
        const { id } = request.params();
        const favouriteRequest = await FavouriteContactRequest_1.default.query().where('favourite_id', authUser.id).where('id', id).firstOrFail();
        await FavouriteContact_1.default.create({
            userId: favouriteRequest.userId,
            favouriteId: favouriteRequest.favouriteId
        });
        await FavouriteContact_1.default.create({
            userId: favouriteRequest.favouriteId,
            favouriteId: favouriteRequest.userId
        });
        await favouriteRequest.delete();
        return response.json({ message: 'Favourite Contact Request Accepted Successfully!' });
    }
    async reject({ request, response, auth }) {
        const authUser = auth.user;
        const { id } = request.params();
        const favouriteRequest = await FavouriteContactRequest_1.default.query().where('favourite_id', authUser.id).where('id', id).firstOrFail();
        await favouriteRequest.delete();
        return response.json({ message: 'Favourite Contact Request Rejected Successfully!' });
    }
    async destroy({ request, response, auth }) {
        const authUser = auth.user;
        const { id } = request.params();
        const favouriteRequest = await FavouriteContact_1.default.query().where('user_id', authUser.id).where('id', id).firstOrFail();
        await favouriteRequest.delete();
        const otherUserRequest = await FavouriteContact_1.default.query().where('user_id', id).where('id', authUser.id).first();
        if (otherUserRequest) {
            await otherUserRequest.delete();
        }
        return response.json({ message: 'Favourite Contact Deleted Successfully!' });
    }
}
exports.default = FavouriteContactsController;
//# sourceMappingURL=FavouriteContactsController.js.map