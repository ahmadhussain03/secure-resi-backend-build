"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class RolePermissions extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'role_permission';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
            table.integer('permission_id').unsigned().references('id').inTable('permissions').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['role_id'], 'role_permission_role_id_foreign');
            table.dropForeign(['permission_id'], 'role_permission_permission_id_foreign');
        });
        this.schema.dropTable(this.tableName);
    }
}
exports.default = RolePermissions;
//# sourceMappingURL=1619995150116_role_permissions.js.map