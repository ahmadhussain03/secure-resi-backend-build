"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Rules_1 = require("@adonisjs/validator/build/src/Rules");
class CreateClientStaffValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'name': Validator_1.schema.string({ trim: true }, [
                Rules_1.rules.maxLength(255)
            ]),
            'mobile_no': Validator_1.schema.string({ trim: true }, [
                Rules_1.rules.maxLength(255)
            ]),
            'email': Validator_1.schema.string({ trim: true }, [
                Rules_1.rules.email(),
                Rules_1.rules.unique({ table: 'profiles', column: 'email' }),
                Rules_1.rules.maxLength(255)
            ]),
            'staff_code': Validator_1.schema.string({ trim: true }, [
                Rules_1.rules.maxLength(255),
                Rules_1.rules.unique({ table: 'client_staffs', column: 'staff_code' })
            ]),
            'staff_id': Validator_1.schema.string({ trim: true }, [
                Rules_1.rules.maxLength(255),
                Rules_1.rules.unique({ table: 'client_staffs', column: 'staff_id' })
            ]),
            'nfc_code': Validator_1.schema.string({ trim: true }, [
                Rules_1.rules.maxLength(255)
            ]),
            'password': Validator_1.schema.string({}, [
                Rules_1.rules.confirmed(),
                Rules_1.rules.maxLength(255),
                Rules_1.rules.regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,255}$/)
            ]),
            'username': Validator_1.schema.string({ trim: true }, [
                Rules_1.rules.unique({ table: 'users', column: 'username' })
            ]),
            'country': Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            'city': Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            'state': Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            'post_code': Validator_1.schema.string.optional(),
            'address': Validator_1.schema.string.optional(),
            'additional_information': Validator_1.schema.string.optional(),
            'role_id': Validator_1.schema.number(),
            'project_id': Validator_1.schema.number([Rules_1.rules.unsigned()]),
            'image': Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            'latitude': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)]),
            'longitude': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)]),
            'geofenceRadius': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)]),
            'geocode': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)])
        });
        this.messages = {
            'name.required': 'Name field is required.',
            'name.maxLength': 'Name field must be maximum 255 characters.',
            'mobile_no.required': 'Name field is required.',
            'mobile_no.maxLength': 'Name field must be maximum 255 characters.',
            'email.required': 'Email field is required.',
            'email.email': 'Email field is must be a valid email.',
            'email.unique': 'Provided Email is Already Present.',
            'email.maxLength': 'Email field must be maximum 255 characters.',
            'username.required': 'Username field is required.',
            'username.maxLength': 'Username field must be maximum 255 characters.',
            'password.required': 'Password field is required.',
            'password.minLength': 'Password field must be atleast 6 characters.',
            'password.maxLength': 'Password field must be maximum 255 characters.',
            'password_confirmation.confirmed': 'Password must be confirmed.',
            'password.regex': 'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 numeric & 1 special character.'
        };
    }
}
exports.default = CreateClientStaffValidator;
//# sourceMappingURL=CreateClientStaffValidator.js.map