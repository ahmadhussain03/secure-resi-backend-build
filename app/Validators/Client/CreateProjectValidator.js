"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Rules_1 = require("@adonisjs/validator/build/src/Rules");
class CreateProjectValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            "name": Validator_1.schema.string({}, [
                Rules_1.rules.maxLength(255)
            ]),
            "code": Validator_1.schema.string({}, [
                Rules_1.rules.maxLength(255)
            ]),
            "no_of_checkpoints": Validator_1.schema.number.optional(),
            "no_of_gaurds": Validator_1.schema.number.optional(),
            "no_of_members": Validator_1.schema.number.optional(),
            "no_of_project_staff": Validator_1.schema.number.optional(),
            'country': Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            'city': Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            'state': Validator_1.schema.number.optional([Rules_1.rules.unsigned()]),
            "post_code": Validator_1.schema.string.optional(),
            "address": Validator_1.schema.string.optional(),
            "contact_person_name": Validator_1.schema.string.optional(),
            "contact_person_email": Validator_1.schema.string.optional({}, [
                Rules_1.rules.email()
            ]),
            "contact_person_designation": Validator_1.schema.string.optional(),
            "contact_person_phone": Validator_1.schema.string.optional(),
            "contact_person_fax": Validator_1.schema.string.optional(),
            "latitude": Validator_1.schema.string.optional(),
            "longitude": Validator_1.schema.string.optional(),
            "geofence_radius": Validator_1.schema.string.optional(),
            "geocode": Validator_1.schema.string.optional(),
            'logo': Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' }),
            'status': Validator_1.schema.enum(['ACTIVE', 'DEACTIVE'])
        });
        this.messages = {
            'name.required': 'Name field is required.',
            'name.maxLength': 'Name field must be maximum 255 characters.',
            'code.required': 'Project Code field is required.',
            'code.maxLength': 'Project Code field must be maximum 255 characters.',
        };
    }
}
exports.default = CreateProjectValidator;
//# sourceMappingURL=CreateProjectValidator.js.map