"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateEmergencyContactValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({ trim: true }, [Validator_1.rules.maxLength(255)]),
            contactNo: Validator_1.schema.string({ trim: true }),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            forResident: Validator_1.schema.boolean.optional()
        });
        this.messages = {};
    }
}
exports.default = CreateEmergencyContactValidator;
//# sourceMappingURL=CreateEmergencyContactValidator.js.map