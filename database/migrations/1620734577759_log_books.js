"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class LogBooks extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'log_books';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.text('log').nullable();
            table.string('image').nullable();
            table.string('audio').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.integer('log_type_id').unsigned().references('id').inTable('log_types').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = LogBooks;
//# sourceMappingURL=1620734577759_log_books.js.map