"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateTime = void 0;
const PatrolScheduleRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/PatrolScheduleRepositoryContract"));
const QuickSchedulePatrolRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/QuickSchedulePatrolRepositoryContract"));
const View_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/View"));
const QuickSchedulePatrol_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/QuickSchedulePatrol"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const pdf_creator_node_1 = __importDefault(require("pdf-creator-node"));
const CreateQuickSchedulePatrolValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateQuickSchedulePatrolValidator"));
const UpdateQuickSchedulePatrolValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/UpdateQuickSchedulePatrolValidator"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const luxon_1 = require("luxon");
const moment_1 = __importDefault(require("moment"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const UserNotFoundException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/UserNotFoundException"));
const CalculateTime = (start_date, end_date) => {
    if (!end_date)
        return null;
    const startTime = (0, moment_1.default)(start_date.toFormat('yyyy-MM-dd HH:mm:ss'));
    const endTime = (0, moment_1.default)(end_date.toFormat('yyyy-MM-dd HH:mm:ss'));
    var duration = moment_1.default.duration(endTime.diff(startTime));
    var total_hours = parseInt(duration.asHours());
    if (total_hours < 10) {
        total_hours = "0" + total_hours;
    }
    var total_minutes = parseInt(duration.asMinutes()) % 60;
    if (total_minutes < 10) {
        total_minutes = "0" + total_minutes;
    }
    return total_hours + ":" + total_minutes;
};
exports.CalculateTime = CalculateTime;
class QuickSchedulePatrolsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedules = await QuickSchedulePatrolRepositoryContract_1.default.all(request, project);
        return response.json(schedules);
    }
    async list({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const schedules = await QuickSchedulePatrolRepositoryContract_1.default.list(request, project);
        return response.json(schedules);
    }
    async pdf({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const query = request.qs();
        const timezone = query.timezone;
        if (!timezone || !(new luxon_1.IANAZone(timezone).isValid)) {
            throw new UserNotFoundException_1.default('Invalid Timezone!');
        }
        const startDate = query.startDate;
        const endDate = query.endDate;
        let guard = query.guard;
        let patrolSchedule = query.patrolSchedule;
        const status = query.status;
        let staff = '';
        let patrol = '';
        let totalCheckpoints = 0;
        let totalVisited = 0;
        let totalPatrolSchedule = 0;
        let quickSchedulePatrols = await QuickSchedulePatrolRepositoryContract_1.default.list(request, project);
        quickSchedulePatrols = quickSchedulePatrols.map(quickSchedulePatrol => {
            totalCheckpoints += quickSchedulePatrol.checkpoints.length;
            totalVisited += parseInt(quickSchedulePatrol.$extras.visited);
            if (quickSchedulePatrol.patrolScheduleId) {
                totalPatrolSchedule++;
            }
            quickSchedulePatrol.$extras.duration = (0, exports.CalculateTime)(quickSchedulePatrol.startAt, quickSchedulePatrol.endAt);
            return quickSchedulePatrol;
        });
        if (guard) {
            const user = await User_1.default.query().where('id', guard).preload('profile').firstOrFail();
            staff = user.profile.name;
        }
        if (patrolSchedule) {
            const patrolObj = await PatrolScheduleRepositoryContract_1.default.findById(patrolSchedule, project);
            patrol = patrolObj.name;
        }
        const html = await View_1.default.render('quickSchedulePatrol/summary', {
            location: project.name,
            totalCheckpoints,
            totalVisited,
            startDate,
            endDate,
            staff,
            patrol,
            status,
            totalPatrolSchedule,
            quickSchedulePatrols,
            timezone,
            momentTz: moment_timezone_1.default
        });
        const fileName = luxon_1.DateTime.now().toFormat('yyyy_MM_dd_HH_mm_ss');
        await pdf_creator_node_1.default.create({
            html,
            path: Application_1.default.tmpPath(`pdf/${fileName}.pdf`),
            type: '',
            data: {}
        }, {
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: '/dev/null',
                },
            },
            format: 'A4'
        });
        return response.attachment(Application_1.default.tmpPath(`pdf`, `${fileName}.pdf`));
    }
    async pdfSingle({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const query = request.qs();
        const timezone = query.timezone;
        if (!timezone || !(new luxon_1.IANAZone(timezone).isValid)) {
            throw new UserNotFoundException_1.default('Invalid Timezone!');
        }
        const quickSchedulePatrol = await QuickSchedulePatrol_1.default.query().where('id', params.id).where('project_id', project.id).preload('project', projectQuery => projectQuery.preload('user', userQuery => userQuery.preload('profile')))
            .preload('user', query => query.preload('profile').preload('clientStaff')).preload('checkpoints', cQuery => cQuery.preload('checkpoint'))
            .preload('patrolSchedule')
            .withCount('checkpoints', query => query.where('status', true).as('visited')).firstOrFail();
        const duration = (0, exports.CalculateTime)(quickSchedulePatrol.startAt, quickSchedulePatrol.endAt);
        const html = await View_1.default.render('quickSchedulePatrol/summary-single', {
            quickSchedulePatrol,
            project,
            duration,
            timezone,
            momentTz: moment_timezone_1.default
        });
        const fileName = luxon_1.DateTime.now().toFormat('yyyy_MM_dd_HH_mm_ss');
        await pdf_creator_node_1.default.create({
            html,
            path: Application_1.default.tmpPath(`pdf/${fileName}.pdf`),
            type: '',
            data: {}
        }, {
            childProcessOptions: {
                env: {
                    OPENSSL_CONF: '/dev/null',
                },
            },
            format: 'A4'
        });
        return response.attachment(Application_1.default.tmpPath(`pdf`, `${fileName}.pdf`));
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        luxon_1.Settings.defaultZone = luxon_1.IANAZone.create("UTC");
        const data = await request.validate(CreateQuickSchedulePatrolValidator_1.default);
        data.userId = authUser.id;
        data.projectId = project.id;
        const quickSchedulePatrol = await QuickSchedulePatrolRepositoryContract_1.default.create(data);
        return response.json(quickSchedulePatrol);
    }
    async update({ request, response, auth, params }) {
        const authUser = auth.user;
        const project = authUser.clientStaff.project;
        const data = await request.validate(UpdateQuickSchedulePatrolValidator_1.default);
        const quickSchedulePatrolObj = await QuickSchedulePatrol_1.default.query().where('id', params.id).where('project_id', project.id).firstOrFail();
        const quickSchedulePatrol = await QuickSchedulePatrolRepositoryContract_1.default.update(data, quickSchedulePatrolObj);
        return response.json(quickSchedulePatrol);
    }
}
exports.default = QuickSchedulePatrolsController;
//# sourceMappingURL=QuickSchedulePatrolsController.js.map