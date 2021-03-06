"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateMoAccountValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            accountNo: Validator_1.schema.string.optional({ trim: true })
        });
        this.messages = {};
    }
}
exports.default = UpdateMoAccountValidator;
//# sourceMappingURL=UpdateMoAccountValidator.js.map