"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'quick_schedule_patrols';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('patrol_schedule_id').unsigned().nullable().references('id').inTable('patrol_schedules').onDelete('RESTRICT');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('RESTRICT');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('RESTRICT');
            table.string('status');
            table.timestamp('start_at', { useTz: true }).notNullable();
            table.timestamp('end_at', { useTz: true }).nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1666857555657_quick_schedule_patrols.js.map