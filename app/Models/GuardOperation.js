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
const OperationType_1 = __importDefault(require("./OperationType"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class GuardOperation extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], GuardOperation.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], GuardOperation.prototype, "operation", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], GuardOperation.prototype, "operationTypeId", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (audio) => audio ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/guard_operation/audio/${audio}` : null
    }),
    __metadata("design:type", Object)
], GuardOperation.prototype, "audio", void 0);
__decorate([
    (0, Orm_1.column)({
        consume: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/guard_operation/images/${image}` : null
    }),
    __metadata("design:type", Object)
], GuardOperation.prototype, "image", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], GuardOperation.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], GuardOperation.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Object)
], GuardOperation.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ serializeAs: 'created_at' }),
    __metadata("design:type", luxon_1.DateTime)
], GuardOperation.prototype, "dated", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], GuardOperation.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], GuardOperation.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], GuardOperation.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], GuardOperation.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => OperationType_1.default),
    __metadata("design:type", Object)
], GuardOperation.prototype, "operationType", void 0);
exports.default = GuardOperation;
//# sourceMappingURL=GuardOperation.js.map