"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateQuickSchedulePatrolValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            endAt: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd HH:mm' }, [Validator_1.rules.requiredWhen('status', '=', 'COMPLETED')]),
            checkpoints: Validator_1.schema.array([Validator_1.rules.minLength(1)]).members(Validator_1.schema.object().members({
                checkpoint: Validator_1.schema.number([Validator_1.rules.unsigned(), Validator_1.rules.exists({ table: 'checkpoints', column: 'id', where: { 'project_id': this.ctx.auth.user.clientStaff.projectId } })]),
                status: Validator_1.schema.boolean(),
                createdAt: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd HH:mm' }),
            })),
            status: Validator_1.schema.enum(['PENDING', 'COMPLETED'])
        });
        this.messages = {};
    }
}
exports.default = UpdateQuickSchedulePatrolValidator;
//# sourceMappingURL=UpdateQuickSchedulePatrolValidator.js.map