"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'parking_types';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.enu('status', ['Active', 'Inactive']).notNullable();
            table.string('custom_parking_type').notNullable();
            table.boolean('available_in_visitor').notNullable();
            table.time('start_time').notNullable();
            table.time('end_time').notNullable();
            table.string('allow_time_hour').notNullable();
            table.string('allow_time_minute').notNullable();
            table.string('time_flexibility_hour').notNullable();
            table.string('time_flexibility_minute').notNullable();
            table.double('overstay_penalty').notNullable();
            table.double('parking_fee').notNullable();
            table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1658037224745_parking_types.js.map