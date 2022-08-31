"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateVisitorPlanValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            visitorEntry: Validator_1.schema.enum.optional(['single', 'multi', 'multi_vehicle', 'single_vehicle']),
            resident: Validator_1.schema.number.optional([]),
            visitorType: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            seniors: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            adults: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            children: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            infants: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            arrivalTime: Validator_1.schema.date.optional({ format: 'yyyy-mm-dd hh:mm' }),
            exitTime: Validator_1.schema.date.optional({ format: 'yyyy-mm-dd hh:mm' }),
            purposeOfVisit: Validator_1.schema.string.optional({ trim: true }),
            noOfDays: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            vehicleType: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            vehiclePlateNumber: Validator_1.schema.string.optional({ trim: true }, [Validator_1.rules.maxLength(255)]),
            visitors: Validator_1.schema.array.optional().members(Validator_1.schema.number([Validator_1.rules.unsigned()])),
        });
        this.messages = {};
    }
}
exports.default = UpdateVisitorPlanValidator;
//# sourceMappingURL=UpdateVisitorPlanValidator.js.map