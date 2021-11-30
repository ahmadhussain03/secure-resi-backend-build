"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateAttendanceValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            username: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            password: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)]),
            userId: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' })
        });
        this.messages = {};
    }
}
exports.default = CreateAttendanceValidator;
//# sourceMappingURL=CreateAttendanceValidator.js.map