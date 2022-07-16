"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Fcm_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/Fcm"));
class SendScheduleNotification {
    constructor() {
        this.key = 'SendScheduleNotification';
    }
    async handle(job) {
        const { data: schedule } = job;
        const projectId = schedule.schedule.project_id;
        const guards = await User_1.default.query().select(['id', 'device_token']).whereNotNull('device_token').whereHas('clientStaff', (query) => {
            query.where('project_id', projectId);
        }).whereHas('role', (query) => {
            query.where('name', 'guard');
        });
        const guardTokens = guards.map(guard => guard.deviceToken);
        Fcm_1.default.sendNotifications(guardTokens, {
            payload: {
                notification: {
                    title: 'Upcoming Schedule',
                    body: `You have upcoming schedule ${schedule.checkpoint.name}`
                },
                data: {
                    type: 'upcoming_schedule',
                    scheduleId: schedule.schedule_id.toString(),
                    checkpoint: JSON.stringify(schedule.checkpoint),
                }
            }
        });
        return true;
    }
}
exports.default = SendScheduleNotification;
//# sourceMappingURL=SendScheduleNotification.js.map