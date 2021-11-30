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
const Role_1 = __importDefault(require("./Role"));
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const StaffNotificationRead_1 = __importDefault(require("./StaffNotificationRead"));
class StaffNotification extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], StaffNotification.prototype, "id", void 0);
__decorate([
    Orm_1.column.date({
        prepare: (value) => value.toFormat('yyyy-mm-dd'),
        serialize: (value) => value.setZone('Asia/Kuala_Lumpur').toFormat('yyyy-MM-dd')
    }),
    __metadata("design:type", luxon_1.DateTime)
], StaffNotification.prototype, "sendDate", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], StaffNotification.prototype, "subject", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], StaffNotification.prototype, "comment", void 0);
__decorate([
    (0, Orm_1.column)({ columnName: 'role_id' }),
    __metadata("design:type", Object)
], StaffNotification.prototype, "recipientId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], StaffNotification.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)({ serializeAs: null }),
    __metadata("design:type", Number)
], StaffNotification.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/staff_notification/images/${image}` : null
    }),
    __metadata("design:type", Object)
], StaffNotification.prototype, "image", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], StaffNotification.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], StaffNotification.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Role_1.default, {
        localKey: 'id',
        foreignKey: 'recipientId'
    }),
    __metadata("design:type", Object)
], StaffNotification.prototype, "recipient", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => StaffNotificationRead_1.default, {
        foreignKey: 'staffNotificationId',
        localKey: 'id',
    }),
    __metadata("design:type", Object)
], StaffNotification.prototype, "read", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], StaffNotification.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], StaffNotification.prototype, "project", void 0);
exports.default = StaffNotification;
//# sourceMappingURL=StaffNotification.js.map