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
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
const luxon_1 = require("luxon");
const Checkpoint_1 = __importDefault(require("./Checkpoint"));
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class PatrolEntry extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], PatrolEntry.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], PatrolEntry.prototype, "message", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize: (audio) => audio ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/patrol_entry/audio/${audio}` : null
    }),
    __metadata("design:type", Object)
], PatrolEntry.prototype, "audio", void 0);
__decorate([
    (0, Orm_1.column)({
        serialize: (image) => image ? `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/upload/patrol_entry/images/${image}` : null
    }),
    __metadata("design:type", Object)
], PatrolEntry.prototype, "image", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolEntry.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolEntry.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], PatrolEntry.prototype, "checkpointId", void 0);
__decorate([
    Orm_1.column.dateTime({ serializeAs: 'created_at' }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolEntry.prototype, "dated", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, serializeAs: null }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolEntry.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], PatrolEntry.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], PatrolEntry.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Checkpoint_1.default),
    __metadata("design:type", Object)
], PatrolEntry.prototype, "checkpoint", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], PatrolEntry.prototype, "project", void 0);
exports.default = PatrolEntry;
//# sourceMappingURL=PatrolEntry.js.map