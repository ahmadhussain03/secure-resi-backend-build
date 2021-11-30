"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateUnitValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            blockId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            levelId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            name: Validator_1.schema.string.optional({ trim: true }),
            status: Validator_1.schema.enum.optional(['Active', 'Inactive']),
            ownerId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()])
        });
        this.messages = {};
    }
}
exports.default = UpdateUnitValidator;
//# sourceMappingURL=UpdateUnitValidator.js.map