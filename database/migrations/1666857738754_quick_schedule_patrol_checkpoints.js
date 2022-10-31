"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'quick_schedule_patrol_checkpoints';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.boolean('status').notNullable().defaultTo(false);
            table.integer('quick_schedule_patrol_id').unsigned().references('id').inTable('quick_schedule_patrols').onDelete('RESTRICT');
            table.integer('checkpoint_id').unsigned().references('id').inTable('checkpoints').onDelete('RESTRICT');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1666857738754_quick_schedule_patrol_checkpoints.js.map