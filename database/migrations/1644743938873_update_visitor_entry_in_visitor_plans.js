"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UpdateVisitorEntryInVisitorPlans extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'visitor_plans';
    }
    async up() {
        await Database_1.default.rawQuery(`ALTER TABLE visitor_plans DROP CONSTRAINT visitor_plans_visitor_entry_check`);
        this.schema.alterTable(this.tableName, (table) => {
            table.string('visitor_entry').alter();
        });
    }
    async down() {
    }
}
exports.default = UpdateVisitorEntryInVisitorPlans;
//# sourceMappingURL=1644743938873_update_visitor_entry_in_visitor_plans.js.map