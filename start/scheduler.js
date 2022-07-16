"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bull_1 = __importDefault(global[Symbol.for('ioc.use')]("Rocketseat/Bull"));
const QueueScheduleNotification_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Jobs/QueueScheduleNotification"));
Bull_1.default.add(new QueueScheduleNotification_1.default().key, {}, {
    repeat: {
        cron: "0 3 * * *"
    }
});
//# sourceMappingURL=scheduler.js.map