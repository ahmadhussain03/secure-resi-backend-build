"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class ScheduleRoutines extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'schedule_routines';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('schedule_id').unsigned().references('id').inTable('schedules').onDelete('CASCADE');
            table.integer('checkpoint_id').unsigned().references('id').inTable('checkpoints').onDelete('CASCADE');
            table.date('check_date').nullable();
            table.time('start_time').notNullable();
            table.time('end_time').notNullable();
            table.boolean('saturday').defaultTo(false);
            table.boolean('sunday').defaultTo(false);
            table.boolean('monday').defaultTo(false);
            table.boolean('tuesday').defaultTo(false);
            table.boolean('wednesday').defaultTo(false);
            table.boolean('thursday').defaultTo(false);
            table.boolean('friday').defaultTo(false);
            table.boolean('lock_time').defaultTo(false);
            table.enu('repeat', ['Daily', 'Monthly', 'Yearly']).notNullable();
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = ScheduleRoutines;
//# sourceMappingURL=1620805117065_schedule_routines.js.map