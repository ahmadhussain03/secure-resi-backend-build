"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ScheduleEntries extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'schedule_entries';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('checkpoint_id').unsigned().references('id').inTable('checkpoints').onDelete('CASCADE');
            table.integer('schedule_id').unsigned().references('id').inTable('schedules').onDelete('CASCADE');
            table.text('message').nullable();
            table.string('audio').nullable();
            table.string('image').nullable();
            table.enu('status', ['On Time', 'After Time']);
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = ScheduleEntries;
//# sourceMappingURL=1621713909484_schedule_entries.js.map