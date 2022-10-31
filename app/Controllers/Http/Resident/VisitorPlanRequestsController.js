"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VisitorPlan_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/VisitorPlan"));
class VisitorPlanRequestsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const query = request.qs();
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 15;
        const plansQuery = VisitorPlan_1.default.query().where('user_id', authUser.id).where('status', 'Waiting').preload('visitors');
        const plans = await plansQuery.paginate(page, limit);
        return response.json(plans);
    }
    async approve({ response, auth, params }) {
        const authUser = auth.user;
        const plan = await VisitorPlan_1.default.query().where('id', params.id).where('user_id', authUser.id).where('status', 'Waiting').firstOrFail();
        plan.status = 'Approved';
        await plan.save();
        return response.json(plan);
    }
    async reject({ response, auth, params }) {
        const authUser = auth.user;
        const plan = await VisitorPlan_1.default.query().where('id', params.id).where('user_id', authUser.id).where('status', 'Waiting').firstOrFail();
        plan.status = 'Rejected';
        await plan.save();
        return response.json(plan);
    }
}
exports.default = VisitorPlanRequestsController;
//# sourceMappingURL=VisitorPlanRequestsController.js.map