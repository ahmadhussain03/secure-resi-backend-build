"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Roles extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'roles';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name');
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true }).notNullable();
            table.timestamp('updated_at', { useTz: true }).notNullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['user_id'], 'roles_user_id_foreign');
        });
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Roles;
//# sourceMappingURL=1619995004902_roles.js.map