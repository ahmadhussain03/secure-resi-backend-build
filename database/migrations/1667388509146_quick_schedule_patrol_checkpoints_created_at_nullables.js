"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'quick_schedule_patrol_checkpoints';
    }
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.timestamp('created_at', { useTz: true }).nullable().alter();
        });
    }
    async down() {
    }
}
exports.default = default_1;
//# sourceMappingURL=1667388509146_quick_schedule_patrol_checkpoints_created_at_nullables.js.map