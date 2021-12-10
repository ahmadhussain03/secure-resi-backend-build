"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Fingerprint_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Fingerprint"));
class FingerprintsController {
    async index({ response }) {
        return response.json({ message: 'TODO' });
    }
    async create({ request, auth, response }) {
        const fingerSchema = Validator_1.schema.create({
            fingerprint: Validator_1.schema.string({ trim: true })
        });
        const data = await request.validate({ schema: fingerSchema });
        const user = auth.user;
        const fingerprint = new Fingerprint_1.default();
        fingerprint.fingerprint = data.fingerprint;
        await user.related('fingerprints').save(fingerprint);
        return response.json({ fingerprint });
    }
}
exports.default = FingerprintsController;
//# sourceMappingURL=FingerprintsController.js.map