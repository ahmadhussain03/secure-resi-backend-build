"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Visitors extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitors';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.bigIncrements('id');
            table.string('name');
            table.enu('registration_document', ['passport', 'ic', 'driving_licence', 'manual_entry', 'other']);
            table.string('registration_no');
            table.enu('gender', ['male', 'female', 'other']);
            table.string('phone');
            table.date('dob').nullable();
            table.string('email').nullable();
            table.string('nationality');
            table.string('id_card').nullable();
            table.string('image').nullable();
            table.string('document').nullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').nullable();
            table.integer('unit_id').unsigned().references('id').inTable('units').onDelete('CASCADE').nullable();
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('CASCADE').nullable();
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['user_id'], 'visitors_user_id_foreign');
            table.dropForeign(['project_id'], 'visitors_project_id_foreign');
        });
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Visitors;
//# sourceMappingURL=1628148573865_visitors.js.map