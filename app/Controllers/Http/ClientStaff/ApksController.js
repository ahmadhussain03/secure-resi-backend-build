"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Apk_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Apk"));
class ApksController {
    async index({ request, response }) {
        const qs = request.qs();
        const version = qs.version;
        if (!version)
            return response.json(null);
        const apk = await Apk_1.default.query().where('version', '>', version).orderBy('version', 'desc').first();
        return response.json(apk);
    }
}
exports.default = ApksController;
//# sourceMappingURL=ApksController.js.map