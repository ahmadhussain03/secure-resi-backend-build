"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class StaffIdColumnInClientStaffs extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'client_staffs';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.string('staff_id').nullable();
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('staff_id');
        });
    }
}
exports.default = StaffIdColumnInClientStaffs;
//# sourceMappingURL=1639554337400_staff_id_column_in_client_staffs.js.map