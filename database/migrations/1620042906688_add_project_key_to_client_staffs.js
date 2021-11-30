"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddProjectKeyToClientStaffs extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'client_staffs';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('project_id').unsigned().references('id').inTable('projects').onDelete('SET NULL').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign(['project_id'], 'client_staffs_project_id_foreign');
        });
    }
}
exports.default = AddProjectKeyToClientStaffs;
//# sourceMappingURL=1620042906688_add_project_key_to_client_staffs.js.map