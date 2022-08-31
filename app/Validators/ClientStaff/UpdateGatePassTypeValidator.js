"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateGatePassTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            customGatePassType: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)]),
            personalGatePassAvailableInCheckin: Validator_1.schema.boolean.optional(),
            vehicleGatePassAvailableInCheckin: Validator_1.schema.boolean.optional(),
            status: Validator_1.schema.enum.optional(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = UpdateGatePassTypeValidator;
//# sourceMappingURL=UpdateGatePassTypeValidator.js.map