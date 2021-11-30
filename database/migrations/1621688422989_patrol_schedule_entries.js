"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class PatrolScheduleEntries extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'patrol_schedule_entries';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('checkpoint_id').unsigned().references('id').inTable('checkpoints').onDelete('CASCADE');
            table.integer('patrol_schedule_id').unsigned().references('id').inTable('patrol_schedules').onDelete('CASCADE');
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
exports.default = PatrolScheduleEntries;
//# sourceMappingURL=1621688422989_patrol_schedule_entries.js.map