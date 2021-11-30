"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdatePatrolScheduleValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            status: Validator_1.schema.enum.optional(['ACTIVE', 'SUSPENDED', 'DEACTIVE', 'APPROVE']),
            name: Validator_1.schema.string.optional({ trim: true, escape: true }),
            description: Validator_1.schema.string.optional({ trim: true, escape: true }),
            routine: Validator_1.schema.object.optional().members({
                checkDate: Validator_1.schema.date.optional({ format: 'yyyy-mm-dd' }),
                startTime: Validator_1.schema.date({ format: 'hh:mm a' }),
                endTime: Validator_1.schema.date({ format: 'hh:mm a' }),
                saturday: Validator_1.schema.boolean.optional(),
                sunday: Validator_1.schema.boolean.optional(),
                monday: Validator_1.schema.boolean.optional(),
                tuesday: Validator_1.schema.boolean.optional(),
                wednesday: Validator_1.schema.boolean.optional(),
                thursday: Validator_1.schema.boolean.optional(),
                friday: Validator_1.schema.boolean.optional(),
                repeat: Validator_1.schema.enum(['Daily', 'Monthly', 'Yearly']),
                lockTime: Validator_1.schema.boolean.optional()
            }),
            checkpoints: Validator_1.schema.array.optional().members(Validator_1.schema.object().members({
                checkpoint: Validator_1.schema.number([Validator_1.rules.unsigned()]),
                priority: Validator_1.schema.number(),
                estimated_time: Validator_1.schema.number()
            }))
        });
        this.messages = {};
    }
}
exports.default = UpdatePatrolScheduleValidator;
//# sourceMappingURL=UpdatePatrolScheduleValidator.js.map