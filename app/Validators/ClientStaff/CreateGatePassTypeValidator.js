"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateGatePassTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            customGatePassType: Validator_1.schema.string({}, [Validator_1.rules.maxLength(255)]),
            personalGatePassAvailableInCheckin: Validator_1.schema.boolean(),
            vehicleGatePassAvailableInCheckin: Validator_1.schema.boolean(),
            status: Validator_1.schema.enum(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = CreateGatePassTypeValidator;
//# sourceMappingURL=CreateGatePassTypeValidator.js.map