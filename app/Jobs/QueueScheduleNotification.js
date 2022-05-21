"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Bull_1 = __importDefault(global[Symbol.for('ioc.use')]("Rocketseat/Bull"));
const ScheduleRoutine_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/ScheduleRoutine"));
const date_fns_1 = require("date-fns");
const luxon_1 = require("luxon");
const SendScheduleNotification_1 = __importDefault(require("./SendScheduleNotification"));
class QueueScheduleNotification {
    constructor() {
        this.key = 'QueueScheduleNotification';
    }
    async handle() {
        const currentTime = luxon_1.DateTime.now().toFormat('HH:mm:ss');
        const todayDate = luxon_1.DateTime.now().toFormat('yyyy-MM-dd');
        const todayDateNumber = luxon_1.DateTime.now().toFormat('dd');
        const today = luxon_1.DateTime.now().weekdayLong.toLowerCase();
        const schedulesQuery = ScheduleRoutine_1.default.query().where('start_time', '>', currentTime).preload('schedule').preload('checkpoint');
        schedulesQuery.where(subQuery => {
            subQuery.where(query => {
                query.where(query => {
                    query.whereNotNull('check_date').where('repeat', 'Monthly').whereRaw('EXTRACT(DAY FROM check_date) = ?', [todayDateNumber]);
                }).orWhere(query => {
                    query.whereNotNull('check_date').where('repeat', 'Yearly').whereRaw('DATE(check_date) = ?', [todayDate]);
                }).orWhere(query => {
                    query.whereNull('check_date').where('repeat', 'Daily').whereRaw(`${today} = ?`, [true]);
                });
            });
        });
        const schedules = await schedulesQuery.exec();
        schedules.forEach(async (schedule) => {
            if (schedule.checkpoint.notificationAction === 'On Time') {
                const scheduleTime = luxon_1.DateTime.fromFormat(schedule.startTime.toFormat('yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' }).toISO();
                Bull_1.default.schedule(new SendScheduleNotification_1.default().key, schedule, (0, date_fns_1.parseISO)(scheduleTime));
            }
            else {
                const scheduleTime = luxon_1.DateTime.fromFormat(schedule.startTime.minus({ minutes: 10 }).toFormat('yyyy-MM-dd HH:mm:ss'), 'yyyy-MM-dd HH:mm:ss', { zone: 'UTC' });
                if (luxon_1.DateTime.now().diff(scheduleTime, 'seconds').seconds < 0) {
                    Bull_1.default.schedule(new SendScheduleNotification_1.default().key, schedule, (0, date_fns_1.parseISO)(scheduleTime.toISO()));
                }
            }
        });
    }
}
exports.default = QueueScheduleNotification;
//# sourceMappingURL=QueueScheduleNotification.js.map