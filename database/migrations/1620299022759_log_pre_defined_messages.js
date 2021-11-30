"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class LogPreDefinedMessages extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'log_pre_defined_messages';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.text('message').notNullable();
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = LogPreDefinedMessages;
//# sourceMappingURL=1620299022759_log_pre_defined_messages.js.map