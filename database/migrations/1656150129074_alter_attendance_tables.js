"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AddLogoInProjects extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'attendances';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.setNullable('type');
            table.timestamp("in_at", { useTz: true }).nullable();
            table.timestamp("out_at", { useTz: true }).nullable();
        });
    }
    async down() {
    }
}
exports.default = AddLogoInProjects;
//# sourceMappingURL=1656150129074_alter_attendance_tables.js.map