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
            table.setNullable('attendance_through');
            table.string('in_attendance_through').nullable();
            table.string('out_attendance_through').nullable();
        });
    }
    async down() {
    }
}
exports.default = AddLogoInProjects;
//# sourceMappingURL=1656228105259_add_through_column_in_attendances.js.map