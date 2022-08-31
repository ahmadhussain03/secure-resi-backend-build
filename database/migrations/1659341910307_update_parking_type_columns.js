"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'parking_types';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.boolean('available_in_visitor').nullable().alter();
            table.time('start_time').nullable().alter();
            table.time('end_time').nullable().alter();
            table.string('allow_time_hour').nullable().alter();
            table.string('allow_time_minute').nullable().alter();
            table.string('time_flexibility_hour').nullable().alter();
            table.string('time_flexibility_minute').nullable().alter();
            table.double('overstay_penalty').nullable().alter();
            table.double('parking_fee').nullable().alter();
        });
    }
    async down() {
    }
}
exports.default = default_1;
//# sourceMappingURL=1659341910307_update_parking_type_columns.js.map