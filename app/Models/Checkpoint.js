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
const Project_1 = __importDefault(require("./Project"));
const User_1 = __importDefault(require("./User"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class Checkpoint extends Orm_1.BaseModel {
    get qrImage() {
        return `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/uploads/qr_code/${this.code}.jpg`;
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Checkpoint.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "code", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "nfcCode", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "phoneNumber", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "note", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "latitude", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "longitude", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "geofenceRadius", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "geocode", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "notificationAction", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "hour", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "minute", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value ? value.toFormat('yyyy-mm-dd') : null,
        serialize: (value) => value ? value.toFormat('yyyy-MM-dd') : null
    }),
    __metadata("design:type", luxon_1.DateTime)
], Checkpoint.prototype, "reminderDatetime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "subject", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "notification", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Checkpoint.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Checkpoint.prototype, "projectId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Checkpoint.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Checkpoint.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], Checkpoint.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], Checkpoint.prototype, "user", void 0);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], Checkpoint.prototype, "qrImage", null);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "pivotEstimatedTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Checkpoint.prototype, "pivotPriority", void 0);
exports.default = Checkpoint;
//# sourceMappingURL=Checkpoint.js.map