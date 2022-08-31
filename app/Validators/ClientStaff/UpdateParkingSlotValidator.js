"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UpdateParkingSlotValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255), Validator_1.rules.unique({ table: "parking_slots", column: "name", where: { parking_level_id: this.ctx.request.input('parkingLevelId') }, whereNot: { id: this.ctx.params.id } })]),
            customSlotName: Validator_1.schema.string.optional({}, [Validator_1.rules.maxLength(255)]),
            parkingTypeId: Validator_1.schema.number.optional([Validator_1.rules.unsigned()]),
            parkingLevelId: Validator_1.schema.number([Validator_1.rules.unsigned()]),
            status: Validator_1.schema.enum.optional(['Active', 'Inactive']),
            allowBlockFromSlotNumber: Validator_1.schema.boolean.optional(),
        });
        this.messages = {};
    }
}
exports.default = UpdateParkingSlotValidator;
//# sourceMappingURL=UpdateParkingSlotValidator.js.map