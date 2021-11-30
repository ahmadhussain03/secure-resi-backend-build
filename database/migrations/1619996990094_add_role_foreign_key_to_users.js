"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddRoleForeignKeyToUsers extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['role_id'], 'users_role_id_foreign');
        });
    }
}
exports.default = AddRoleForeignKeyToUsers;
//# sourceMappingURL=1619996990094_add_role_foreign_key_to_users.js.map