"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateStaffNotificationValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            'send_date': Validator_1.schema.date.optional({
                format: 'yyyy-mm-dd'
            }),
            'recipient_id': Validator_1.schema.number.optional([
                Validator_1.rules.unsigned()
            ]),
            'subject': Validator_1.schema.string.optional({
                trim: true
            }, [
                Validator_1.rules.minLength(1),
                Validator_1.rules.maxLength(255)
            ]),
            'comment': Validator_1.schema.string.optional({}, [
                Validator_1.rules.minLength(1)
            ]),
            image: Validator_1.schema.file.optional({ extnames: ['jpg', 'jpeg', 'png', 'bmp'], size: '16mb' })
        });
        this.messages = {
            'send_date.required': "Send Date field is required.",
            'recipient_id.required': "Recipient field is required.",
            'subject.required': "Subject field is required.",
            'comment.required': "Comment field is required.",
            'send_date.format': "Send Date field is required."
        };
    }
}
exports.default = UpdateStaffNotificationValidator;
//# sourceMappingURL=UpdateStaffNotificationValidator.js.map