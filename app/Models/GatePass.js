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
const GatePassType_1 = __importDefault(require("./GatePassType"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
class GatePass extends Orm_1.BaseModel {
    get qrImage() {
        return `http://${Env_1.default.get('IMAGE_HOST')}/api/staff/uploads/gate_pass_code/${this.passNumber}.jpg`;
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], GatePass.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], GatePass.prototype, "passNumber", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], GatePass.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], GatePass.prototype, "gatePassTypeId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], GatePass.prototype, "status", void 0);
__decorate([
    (0, Orm_1.computed)(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], GatePass.prototype, "qrImage", null);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], GatePass.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], GatePass.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], GatePass.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => GatePassType_1.default),
    __metadata("design:type", Object)
], GatePass.prototype, "gatePassType", void 0);
exports.default = GatePass;
//# sourceMappingURL=GatePass.js.map