"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class OperationTypes extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'operation_types';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.text('name').notNullable();
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE');
            table.string('status').notNullable();
            table.string('status_one').nullable();
            table.string('status_two').nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = OperationTypes;
//# sourceMappingURL=1620297402311_operation_types.js.map