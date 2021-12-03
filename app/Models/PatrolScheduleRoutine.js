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
class PatrolScheduleRoutine extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], PatrolScheduleRoutine.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PatrolScheduleRoutine.prototype, "repeat", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value ? value.toFormat('yyyy-mm-dd') : null,
        serialize: (value) => value ? value.toFormat('yyyy-MM-dd') : null
    }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleRoutine.prototype, "checkDate", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'UTC' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleRoutine.prototype, "startTime", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'UTC' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleRoutine.prototype, "endTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "saturday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "sunday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "monday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "tuesday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "wednesday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "thursday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "friday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], PatrolScheduleRoutine.prototype, "lockTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolScheduleRoutine.prototype, "patrolScheduleId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleRoutine.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleRoutine.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => PatrolSchedule_1.default),
    __metadata("design:type", Object)
], PatrolScheduleRoutine.prototype, "patrolSchedule", void 0);
exports.default = PatrolScheduleRoutine;
//# sourceMappingURL=PatrolScheduleRoutine.js.map