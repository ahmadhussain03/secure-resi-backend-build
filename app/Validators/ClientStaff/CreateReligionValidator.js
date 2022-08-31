"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateReligionValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            religion: Validator_1.schema.string({}, [Validator_1.rules.maxLength(255)]),
            status: Validator_1.schema.enum(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = CreateReligionValidator;
//# sourceMappingURL=CreateReligionValidator.js.map