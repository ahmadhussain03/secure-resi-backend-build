"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateShiftValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            note: Validator_1.schema.string.optional({ trim: true }),
            to: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            assignedItems: Validator_1.schema.array([Validator_1.rules.minLength(1)]).members(Validator_1.schema.number([Validator_1.rules.unsigned()])),
            password: Validator_1.schema.string()
        });
        this.messages = {};
    }
}
exports.default = CreateShiftValidator;
//# sourceMappingURL=CreateShiftValidator.js.map