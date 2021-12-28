"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Logs extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'logs';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.jsonb('content').nullable();
            table.timestamp('created_at', { useTz: true }).defaultTo(this.now());
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Logs;
//# sourceMappingURL=1639915390231_logs.js.map