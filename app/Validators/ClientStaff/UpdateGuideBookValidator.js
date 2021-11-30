"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateGuideBookValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            description: Validator_1.schema.string.optional({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = UpdateGuideBookValidator;
//# sourceMappingURL=UpdateGuideBookValidator.js.map