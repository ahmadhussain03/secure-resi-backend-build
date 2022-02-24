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
const Unit_1 = __importDefault(require("./Unit"));
const Visitor_1 = __importDefault(require("./Visitor"));
class VisitorPlan extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], VisitorPlan.prototype, "visitorEntry", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], VisitorPlan.prototype, "visitorType", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "seniors", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "adults", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "children", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "infants", void 0);
__decorate([
    Orm_1.column.dateTime({
        serialize: (value) => value.toFormat('yyyy-MM-dd hh:mm')
    }),
    __metadata("design:type", luxon_1.DateTime)
], VisitorPlan.prototype, "arrivalTime", void 0);
__decorate([
    Orm_1.column.dateTime({
        serialize: (value) => value.toFormat('yyyy-MM-dd hh:mm')
    }),
    __metadata("design:type", luxon_1.DateTime)
], VisitorPlan.prototype, "exitTime", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], VisitorPlan.prototype, "purposeOfVisit", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "noOfDays", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], VisitorPlan.prototype, "vehicleType", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], VisitorPlan.prototype, "vehiclePlateNumber", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "userId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "projectId", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], VisitorPlan.prototype, "unitId", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], VisitorPlan.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], VisitorPlan.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => User_1.default),
    __metadata("design:type", Object)
], VisitorPlan.prototype, "user", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Project_1.default),
    __metadata("design:type", Object)
], VisitorPlan.prototype, "project", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Unit_1.default),
    __metadata("design:type", Object)
], VisitorPlan.prototype, "unit", void 0);
__decorate([
    (0, Orm_1.manyToMany)(() => Visitor_1.default, {
        localKey: 'id',
        pivotTable: 'visitor_plan_visitors',
        relatedKey: 'id',
        pivotForeignKey: 'visitor_plan_id',
        pivotRelatedForeignKey: 'visitor_id',
        pivotTimestamps: false
    }),
    __metadata("design:type", Object)
], VisitorPlan.prototype, "visitors", void 0);
exports.default = VisitorPlan;
//# sourceMappingURL=VisitorPlan.js.map