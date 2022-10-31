"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'check_outs';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.time('stay_duration').notNullable();
            table.time('overstay_time').nullable();
            table.double('overstay_penalty').nullable();
            table.double('paid').defaultTo(0);
            table.double('discount').defaultTo(0);
            table.double('balance').defaultTo(0);
            table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
            table.integer('check_in_id').unsigned().notNullable().references('id').inTable('check_ins').onDelete('CASCADE');
            table.integer('gate_terminal_id').unsigned().notNullable().references('id').inTable('gate_terminals').onDelete('CASCADE');
            table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['user_id']);
            table.dropForeign(['check_in_id']);
            table.dropForeign(['gate_terminal_id']);
        });
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1661351565819_check_outs.js.map