"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateVisitorValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            registration_document: Validator_1.schema.enum.optional(['passport', 'ic', 'driving_licence', 'manual_entry', 'other']),
            registration_no: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            gender: Validator_1.schema.enum.optional(['male', 'female', 'other']),
            phone: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(20)]),
            dob: Validator_1.schema.date.optional({ format: 'yyyy-mm-dd' }),
            email: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.email()]),
            nationality: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(50)]),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            idCard: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            document: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
        });
        this.messages = {};
    }
}
exports.default = UpdateVisitorValidator;
//# sourceMappingURL=UpdateVisitorValidator.js.map