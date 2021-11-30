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
const Checkpoint_1 = __importDefault(require("./Checkpoint"));
const Project_1 = __importDefault(require("./Project"));
const PatrolSchedule_1 = __importDefault(require("./PatrolSchedule"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class PatrolScheduleEntry extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], PatrolScheduleEntry.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PatrolScheduleEntry.prototype, "message", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize: (audio) => audio ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/patrol_schedule_entry/audio/${audio}` : null
    }),
    __metadata("design:type", Object)
], PatrolScheduleEntry.prototype, "audio", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/patrol_schedule_entry/images/${image}` : null
    }),
    __metadata("design:type", Object)
], PatrolScheduleEntry.prototype, "image", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PatrolScheduleEntry.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolScheduleEntry.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolScheduleEntry.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolScheduleEntry.prototype, "checkpointId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolScheduleEntry.prototype, "patrolScheduleId", void 0);
__decorate([
    Orm_1.column.dateTime({ serializeAs: 'created_at' }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleEntry.prototype, "dated", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleEntry.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolScheduleEntry.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default, {
        localKey: 'id',
        foreignKey: 'userIdw'
    }),
    __metadata("design:type", Object)
], PatrolScheduleEntry.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Checkpoint_1.default),
    __metadata("design:type", Object)
], PatrolScheduleEntry.prototype, "checkpoint", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => PatrolSchedule_1.default),
    __metadata("design:type", Object)
], PatrolScheduleEntry.prototype, "patrolSchedule", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], PatrolScheduleEntry.prototype, "project", void 0);
exports.default = PatrolScheduleEntry;
//# sourceMappingURL=PatrolScheduleEntry.js.map