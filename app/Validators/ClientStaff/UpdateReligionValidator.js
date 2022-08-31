"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateReligionValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            religion: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)]),
            status: Validator_1.schema.enum.optional(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = UpdateReligionValidator;
//# sourceMappingURL=UpdateReligionValidator.js.map