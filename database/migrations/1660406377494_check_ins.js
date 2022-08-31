"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'check_ins';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.decimal('payable_amount').defaultTo(0);
            table.integer('parking_slot_id').unsigned().nullable().references('id').inTable('parking_slots').onDelete('SET NULL');
            table.integer('vehicle_gate_pass_id').unsigned().nullable().references('id').inTable('gate_passes').onDelete('SET NULL');
            table.integer('personal_gate_pass_id').unsigned().nullable().references('id').inTable('gate_passes').onDelete('SET NULL');
            table.integer('visitor_plan_id').unsigned().references('id').inTable('visitor_plans').onDelete('CASCADE');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.timestamp('check_out_at', { useTz: true }).nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['visitor_plan_id']);
            table.dropForeign(['project_id']);
            table.dropForeign(['user_id']);
            table.dropForeign(['personal_gate_pass_id']);
            table.dropForeign(['vehicle_gate_pass_id']);
            table.dropForeign(['parking_slot_id']);
        });
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1660406377494_check_ins.js.map