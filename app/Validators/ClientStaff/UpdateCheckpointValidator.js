"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateCheckpointValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.refs = Validator_1.schema.refs({
            projectId: this.ctx.auth.user.clientStaff.projectId
        });
        this.schema = Validator_1.schema.create({
            status: Validator_1.schema.enum.optional(['ACTIVE', 'SUSPENDED', 'DEACTIVE', 'APPROVE']),
            name: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255)]),
            nfcCode: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255), Validator_1.rules.unique({
                    column: 'nfc_code',
                    table: 'checkpoints',
                    where: { project_id: this.refs.projectId },
                    whereNot: { "id": this.ctx.params.id }
                })]),
            phoneNumber: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255), Validator_1.rules.unique({ table: 'checkpoints', column: 'phone_number', whereNot: { "id": this.ctx.params.id }, where: { "project_id": this.refs.projectId } })]),
            note: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255)]),
            latitude: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255)]),
            longitude: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255)]),
            geofenceRadius: Validator_1.schema.number.optional([]),
            geocode: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255)]),
            notificationAction: Validator_1.schema.enum.optional(['On Time', 'Before Time', 'Before Custom Time', 'After Custom Time']),
            hour: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(2)]),
            minute: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(2)]),
            reminderDatetime: Validator_1.schema.date.optional({ format: 'yyyy-mm-dd' }),
            subject: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255)]),
            notification: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.minLength(1), Validator_1.rules.maxLength(255)]),
        });
        this.messages = {};
    }
}
exports.default = UpdateCheckpointValidator;
//# sourceMappingURL=UpdateCheckpointValidator.js.map