"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UserItems extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'user_items';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.integer('item_id').unsigned().references('id').inTable('items').onDelete('CASCADE');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UserItems;
//# sourceMappingURL=1622277728332_user_items.js.map