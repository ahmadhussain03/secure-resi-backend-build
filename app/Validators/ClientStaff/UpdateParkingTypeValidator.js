"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateParkingTypeValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            customParkingType: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255), Validator_1.rules.unique({ table: 'parking_types', column: 'custom_parking_type', whereNot: { id: this.ctx.params.id } })]),
            availableInVisitor: Validator_1.schema.boolean.optional(),
            startTime: Validator_1.schema.date.optional({ format: 'hh:mm a' }),
            endTime: Validator_1.schema.date.optional({ format: 'hh:mm a' }),
            allowTimeHour: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            allowTimeMinute: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            timeFlexibilityHour: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            timeFlexibilityMinute: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            overstayPenalty: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            parkingFee: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            status: Validator_1.schema.enum.optional(['Active', 'Inactive'])
        });
        this.messages = {};
    }
}
exports.default = UpdateParkingTypeValidator;
//# sourceMappingURL=UpdateParkingTypeValidator.js.map