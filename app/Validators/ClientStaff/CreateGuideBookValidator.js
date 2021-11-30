"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateGuideBookValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            description: Validator_1.schema.string({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = CreateGuideBookValidator;
//# sourceMappingURL=CreateGuideBookValidator.js.map