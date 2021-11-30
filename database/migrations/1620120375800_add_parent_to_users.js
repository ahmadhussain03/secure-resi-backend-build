"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddParentToUsers extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('parent_id').unsigned().references('id').inTable('users').onDelete('CASCADE').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['parent_id'], 'users_parent_id_foreign');
        });
    }
}
exports.default = AddParentToUsers;
//# sourceMappingURL=1620120375800_add_parent_to_users.js.map