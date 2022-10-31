"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Visitor_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Visitor"));
const luxon_1 = require("luxon");
class VisitorOverstaysController {
    async index({ request, response }) {
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const visitors = await Visitor_1.default.query().whereHas('visitorPlans', visitorPlanQuery => {
            visitorPlanQuery.where('status', 'Checked-In').where('exit_time', '<=', luxon_1.DateTime.now().toSQL()).whereHas('checkIn', checkInQuery => checkInQuery.whereNull('check_out_at'));
        }).paginate(page, limit);
        for (let i = 0; i < visitors.length; i++) {
            await visitors[i].load('visitorPlans', query => query.where('exit_time', '<=', luxon_1.DateTime.now().toSQL()).where('status', 'Checked-In').orderBy('created_at', 'desc').whereHas('checkIn', checkInQuery => checkInQuery.whereNull('check_out_at')).preload('unit').preload('user', userQuery => userQuery.preload('profile')).preload('visitorType').preload('visitors').preload('checkIn').limit(1));
        }
        return response.json(visitors);
    }
}
exports.default = VisitorOverstaysController;
//# sourceMappingURL=VisitorOverstaysController.js.map