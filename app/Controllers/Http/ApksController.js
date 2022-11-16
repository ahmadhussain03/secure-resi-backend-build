"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Apk_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Apk"));
class ApksController {
    async store({ request, response }) {
        const apkSchema = Validator_1.schema.create({
            file: Validator_1.schema.file({
                extnames: ['apk'],
            }),
            version: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        const payload = await request.validate({ schema: apkSchema });
        await payload.file.moveToDisk('apk');
        const apk = await Apk_1.default.create({
            file: payload.file.fileName,
            version: payload.version
        });
        return response.json(apk);
    }
}
exports.default = ApksController;
//# sourceMappingURL=ApksController.js.map