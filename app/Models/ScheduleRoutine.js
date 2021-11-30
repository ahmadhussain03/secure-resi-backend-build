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
const Schedule_1 = __importDefault(require("./Schedule"));
const Checkpoint_1 = __importDefault(require("./Checkpoint"));
class ScheduleRoutine extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], ScheduleRoutine.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], ScheduleRoutine.prototype, "repeat", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value ? value.toFormat('yyyy-mm-dd') : null,
        serialize: (value) => value ? value.toFormat('yyyy-MM-dd') : null
    }),
    __metadata("design:type", luxon_1.DateTime)
], ScheduleRoutine.prototype, "checkDate", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'Asia/Kuala_Lumpur' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], ScheduleRoutine.prototype, "startTime", void 0);
__decorate([
    Orm_1.column.dateTime({
        prepare: (value) => luxon_1.DateTime.fromFormat(value.toFormat('HH:mm:ss'), 'HH:mm:ss', { zone: 'Asia/Kuala_Lumpur' }).setZone('UTC').toFormat('HH:mm:ss'),
        serialize: (value) => value.toFormat('hh:mm a')
    }),
    __metadata("design:type", luxon_1.DateTime)
], ScheduleRoutine.prototype, "endTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "saturday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "sunday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "monday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "tuesday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "wednesday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "thursday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "friday", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], ScheduleRoutine.prototype, "lockTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ScheduleRoutine.prototype, "scheduleId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], ScheduleRoutine.prototype, "checkpointId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ScheduleRoutine.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], ScheduleRoutine.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Schedule_1.default),
    __metadata("design:type", Object)
], ScheduleRoutine.prototype, "schedule", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Checkpoint_1.default),
    __metadata("design:type", Object)
], ScheduleRoutine.prototype, "checkpoint", void 0);
exports.default = ScheduleRoutine;
//# sourceMappingURL=ScheduleRoutine.js.map