"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateUnitValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            blockId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            levelId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            units: Validator_1.schema.array([Validator_1.rules.minLength(1)]).members(Validator_1.schema.string({ trim: true })),
            status: Validator_1.schema.enum(['Active', 'Inactive']),
            ownerId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()])
        });
        this.messages = {};
    }
}
exports.default = CreateUnitValidator;
//# sourceMappingURL=CreateUnitValidator.js.map