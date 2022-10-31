"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const PatrolSchedule_1 = __importDefault(require("./PatrolSchedule"));
const User_1 = __importDefault(require("./User"));
const QuickSchedulePatrolCheckpoint_1 = __importDefault(require("./QuickSchedulePatrolCheckpoint"));
const Project_1 = __importDefault(require("./Project"));
class QuickSchedulePatrol extends Orm_1.BaseModel {
    serializeExtras() {
        return {
            visited: parseInt(this.$extras.visited) || 0,
        };
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], QuickSchedulePatrol.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], QuickSchedulePatrol.prototype, "patrolScheduleId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], QuickSchedulePatrol.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], QuickSchedulePatrol.prototype, "projectId", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", luxon_1.DateTime)
], QuickSchedulePatrol.prototype, "startAt", void 0);
__decorate([
    Orm_1.column.dateTime(),
    __metadata("design:type", Object)
], QuickSchedulePatrol.prototype, "endAt", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], QuickSchedulePatrol.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], QuickSchedulePatrol.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], QuickSchedulePatrol.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => PatrolSchedule_1.default),
    __metadata("design:type", Object)
], QuickSchedulePatrol.prototype, "patrolSchedule", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], QuickSchedulePatrol.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], QuickSchedulePatrol.prototype, "project", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => QuickSchedulePatrolCheckpoint_1.default),
    __metadata("design:type", Object)
], QuickSchedulePatrol.prototype, "checkpoints", void 0);
exports.default = QuickSchedulePatrol;
//# sourceMappingURL=QuickSchedulePatrol.js.map