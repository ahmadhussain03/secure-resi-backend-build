"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddPostalCodeColumnInVisitors extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitors';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('post_code').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('post_code');
        });
    }
}
exports.default = AddPostalCodeColumnInVisitors;
//# sourceMappingURL=1642697466500_add_postal_code_column_in_visitors.js.map