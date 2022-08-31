"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateGatePassValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            passNumber: Validator_1.schema.string({}, [Validator_1.rules.maxLength(255)]),
            gatePassTypeId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            status: Validator_1.schema.enum(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = CreateGatePassValidator;
//# sourceMappingURL=CreateGatePassValidator.js.map