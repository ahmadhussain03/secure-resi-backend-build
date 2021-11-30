"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateLevelValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            blockId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            levels: Validator_1.schema.array([Validator_1.rules.minLength(1)]).members(Validator_1.schema.string({ trim: true })),
            status: Validator_1.schema.enum(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = CreateLevelValidator;
//# sourceMappingURL=CreateLevelValidator.js.map