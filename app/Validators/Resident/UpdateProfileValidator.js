"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateProfileValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'name': Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.maxLength(255)
            ]),
            'mobileNo': Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.maxLength(255)
            ]),
            'phone': Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.maxLength(255)
            ]),
            'email': Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'profiles', column: 'email', whereNot: { user_id: this.ctx.auth.user?.id } }),
                Validator_1.rules.maxLength(255),
            ]),
            'password': Validator_1.schema.string.optional({ trim: true }, [
                Validator_1.rules.confirmed(),
                Validator_1.rules.maxLength(255),
                Validator_1.rules.regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,255}$/)
            ]),
            'nationality': Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            'note': Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            'passport': Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            'gender': Validator_1.schema.enum.optional(['male', 'female']),
            'race': Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            'religion': Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            'country': Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            'city': Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            'state': Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            'post_code': Validator_1.schema.string.optional(),
            'address': Validator_1.schema.string.optional(),
            'image': Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            'idCard': Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            'sign': Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            'dob': Validator_1.schema.date.optional({ format: 'yyyy-mm-dd' }),
            'hasCompany': Validator_1.schema.boolean.optional(),
            'companyName': Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            'companyPhone': Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            'companyMobile': Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            'companyEmail': Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            'isApproved': Validator_1.schema.boolean.optional(),
            'status': Validator_1.schema.enum.optional(['Active', 'Inactive']),
        });
        this.messages = {
            'password.regex': 'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 numeric & 1 special character.'
        };
    }
}
exports.default = UpdateProfileValidator;
//# sourceMappingURL=UpdateProfileValidator.js.map