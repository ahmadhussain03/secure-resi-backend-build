"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateMoveValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            type: Validator_1.schema.enum.optional(['in', 'out']),
            dateFrom: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd' }),
            dateTo: Validator_1.schema.date.optional({ format: 'yyyy-MM-dd' }),
            fromTime: Validator_1.schema.date({ format: 'hh:mm a' }),
            toTime: Validator_1.schema.date({ format: 'hh:mm a' }),
            descriptionOfGoods: Validator_1.schema.string.optional(),
            notes: Validator_1.schema.string.optional({ trim: true }),
            vehicleType: Validator_1.schema.string.optional({ trim: true }),
            vehicleNo: Validator_1.schema.string.optional({ trim: true }),
            driverName: Validator_1.schema.string.optional({ trim: true }),
            driverContactNo: Validator_1.schema.string.optional({ trim: true }),
            payment: Validator_1.schema.enum.optional(['cash', 'bank']),
            bankName: Validator_1.schema.string.optional({ trim: true }),
            bankOption: Validator_1.schema.enum.optional(['Online Transfer', 'Cheque', 'Other'], [Validator_1.rules.requiredIfExists('bankName')]),
            transactionNumber: Validator_1.schema.string.optional({ trim: true }),
            amount: Validator_1.schema.number.optional([]),
            moAccountId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()])
        });
        this.messages = {};
    }
}
exports.default = UpdateMoveValidator;
//# sourceMappingURL=UpdateMoveValidator.js.map