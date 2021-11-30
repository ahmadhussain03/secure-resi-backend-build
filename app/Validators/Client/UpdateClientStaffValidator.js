"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Rules_1 = require("@adonisjs/validator/build/src/Rules");
class UpdateClientStaffValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            "name": Validator_1.schema.string.optional({ trim: true }, [
                Rules_1.rules.maxLength(255)
            ]),
            "mobile_no": Validator_1.schema.string.optional({ trim: true }, [
                Rules_1.rules.maxLength(255)
            ]),
            "email": Validator_1.schema.string.optional({ trim: true }, [
                Rules_1.rules.email(),
                Rules_1.rules.unique({ table: "profiles", column: "email", whereNot: { "user_id": this.ctx.params.id } }),
                Rules_1.rules.maxLength(255)
            ]),
            "staff_code": Validator_1.schema.string.optional({ trim: true }, [
                Rules_1.rules.maxLength(255),
                Rules_1.rules.unique({ table: 'client_staffs', column: 'staff_code', whereNot: { "user_id": this.ctx.params.id } })
            ]),
            "nfc_code": Validator_1.schema.string.optional({ trim: true }, [
                Rules_1.rules.maxLength(255)
            ]),
            "password": Validator_1.schema.string.optional({}, [
                Rules_1.rules.confirmed(),
                Rules_1.rules.maxLength(255),
                Rules_1.rules.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,255}$/)
            ]),
            "username": Validator_1.schema.string.optional({ trim: true }, [
                Rules_1.rules.unique({ table: "users", column: "username", whereNot: { id: this.ctx.params.id } })
            ]),
            "country": Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            "city": Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            "state": Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            "post_code": Validator_1.schema.string.optional(),
            "address": Validator_1.schema.string.optional(),
            "additional_information": Validator_1.schema.string.optional(),
            "role_id": Validator_1.schema.number.optional(),
            "project_id": Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            'image': Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            'latitude': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)]),
            'longitude': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)]),
            'geofenceRadius': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)]),
            'geocode': Validator_1.schema.string.optional({ trim: true }, [Rules_1.rules.minLength(1), Rules_1.rules.maxLength(255)])
        });
        this.messages = {
            'password.regex': 'Password must contain atleast 1 Uppercase, 1 Lowercase, 1 numeric & 1 special character.'
        };
    }
}
exports.default = UpdateClientStaffValidator;
//# sourceMappingURL=UpdateClientStaffValidator.js.map