"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitors';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('added_by').defaultTo('resident');
        });
    }
    async down() {
    }
}
exports.default = default_1;
//# sourceMappingURL=1658473337158_add_column_in_visitors.js.map