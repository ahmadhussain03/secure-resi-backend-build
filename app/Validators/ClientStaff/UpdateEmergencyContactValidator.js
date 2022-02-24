"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateEmergencyContactValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            contactNo: Validator_1.schema.string.optional({ trim: true }),
            forResident: Validator_1.schema.boolean.optional(),
            removeImage: Validator_1.schema.boolean.optional()
        });
        this.messages = {};
    }
}
exports.default = UpdateEmergencyContactValidator;
//# sourceMappingURL=UpdateEmergencyContactValidator.js.map