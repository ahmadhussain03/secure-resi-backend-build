"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddLogoInProjects extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'projects';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('added_by').defaultTo('resident');
        });
    }
    async down() {
    }
}
exports.default = AddLogoInProjects;
//# sourceMappingURL=1656401705059_add_added_by_column_in_visitors.js.map