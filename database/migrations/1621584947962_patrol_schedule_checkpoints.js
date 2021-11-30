"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class PatrolScheduleCheckpoints extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'patrol_schedule_checkpoints';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('priority').notNullable();
            table.integer('estimated_time');
            table.integer('patrol_schedule_id').unsigned().references('id').inTable('patrol_schedules').onDelete('CASCADE');
            table.integer('checkpoint_id').unsigned().references('id').inTable('checkpoints').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = PatrolScheduleCheckpoints;
//# sourceMappingURL=1621584947962_patrol_schedule_checkpoints.js.map