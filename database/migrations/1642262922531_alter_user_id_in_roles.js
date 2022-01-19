"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AlterUserIdInRoles extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'roles';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('user_id').unsigned().nullable().alter();
        });
    }
    async down() {
    }
}
exports.default = AlterUserIdInRoles;
//# sourceMappingURL=1642262922531_alter_user_id_in_roles.js.map