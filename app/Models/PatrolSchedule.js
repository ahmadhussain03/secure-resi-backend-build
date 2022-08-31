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
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
const PatrolScheduleRoutine_1 = __importDefault(require("./PatrolScheduleRoutine"));
const Checkpoint_1 = __importDefault(require("./Checkpoint"));
const PatrolScheduleEntry_1 = __importDefault(require("./PatrolScheduleEntry"));
class PatrolSchedule extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], PatrolSchedule.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PatrolSchedule.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PatrolSchedule.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PatrolSchedule.prototype, "description", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolSchedule.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolSchedule.prototype, "projectId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolSchedule.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolSchedule.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], PatrolSchedule.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], PatrolSchedule.prototype, "project", void 0);
__decorate([
    (0, Orm_1.hasOne)(() => PatrolScheduleRoutine_1.default, {
        foreignKey: 'patrolScheduleId',
        localKey: 'id',
        serializeAs: 'routine'
    }),
    __metadata("design:type", Object)
], PatrolSchedule.prototype, "patrolScheduleRoutine", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Checkpoint_1.default, {
        localKey: 'id',
        relatedKey: 'id',
        pivotForeignKey: 'patrol_schedule_id',
        pivotRelatedForeignKey: 'checkpoint_id',
        pivotTable: 'patrol_schedule_checkpoints',
        pivotColumns: ['priority', 'estimated_time'],
    }),
    __metadata("design:type", Object)
], PatrolSchedule.prototype, "checkpoints", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => PatrolScheduleEntry_1.default),
    __metadata("design:type", Object)
], PatrolSchedule.prototype, "patrolScheduleEntries", void 0);
exports.default = PatrolSchedule;
//# sourceMappingURL=PatrolSchedule.js.map