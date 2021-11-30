"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateFacilityValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            dateFrom: Validator_1.schema.date({ format: 'yyyy-MM-dd' }),
            dateTo: Validator_1.schema.date({ format: 'yyyy-MM-dd' }),
            fromTime: Validator_1.schema.date({ format: 'hh:mm a' }),
            toTime: Validator_1.schema.date({ format: 'hh:mm a' }),
            gatheringDescription: Validator_1.schema.string(),
            payment: Validator_1.schema.enum(['cash', 'bank']),
            bankName: Validator_1.schema.string.optional({ trim: true }),
            bankOption: Validator_1.schema.enum.optional(['Online Transfer', 'Cheque', 'Other'], [Validator_1.rules.requiredIfExists('bankName')]),
            transactionNumber: Validator_1.schema.string.optional({ trim: true }),
            amount: Validator_1.schema.number([]),
            moAccountId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            unitId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            facilityTypeId: Validator_1.schema.number([Validator_1.rules.unsigned()])
        });
        this.messages = {};
    }
}
exports.default = CreateFacilityValidator;
//# sourceMappingURL=CreateFacilityValidator.js.map