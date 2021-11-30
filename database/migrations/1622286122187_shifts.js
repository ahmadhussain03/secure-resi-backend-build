"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Shifts extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'shifts';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('from_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('to_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.text('note').nullable();
            table.timestamp("created_at", { useTz: true }).notNullable();
            table.timestamp("updated_at", { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Shifts;
//# sourceMappingURL=1622286122187_shifts.js.map