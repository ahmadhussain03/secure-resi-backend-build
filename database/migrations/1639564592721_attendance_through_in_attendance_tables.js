"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class AttendanceThroughInAttendanceTables extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'attendances';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.enu('attendance_through', ['UAP', 'QRC', 'NFC', 'FR', 'FP']).nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('attendance_through');
        });
    }
}
exports.default = AttendanceThroughInAttendanceTables;
//# sourceMappingURL=1639564592721_attendance_through_in_attendance_tables.js.map