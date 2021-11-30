"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Improvements extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'improvements';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.text('improvement');
            table.string('image').nullable();
            table.enu('status', ['Pending', 'Processing', 'Approved', 'Completed', 'Rejected']).defaultTo('Pending');
            table.string('audio').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('unit_id').unsigned().references('id').inTable('units').onDelete('CASCADE');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('improvement_type_id').unsigned().references('id').inTable('improvement_types').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Improvements;
//# sourceMappingURL=1631697678366_improvements.js.map