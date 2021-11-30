"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ShiftNotAssignItems extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'shift_not_assign_items';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('shift_id').unsigned().references('id').inTable('shifts').onDelete('CASCADE');
            table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE');
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = ShiftNotAssignItems;
//# sourceMappingURL=1622286570295_shift_not_assign_items.js.map