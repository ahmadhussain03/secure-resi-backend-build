"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'parking_slots';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.enu('status', ['Active', 'Inactive']).notNullable();
            table.string('name').notNullable();
            table.string('custom_slot_name').nullable();
            table.boolean('allow_block_from_slot_number').notNullable();
            table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('parking_level_id').unsigned().notNullable().references('id').inTable('parking_levels').onDelete('CASCADE');
            table.integer('parking_type_id').unsigned().notNullable().references('id').inTable('parking_types').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1658038183600_parking_slots.js.map