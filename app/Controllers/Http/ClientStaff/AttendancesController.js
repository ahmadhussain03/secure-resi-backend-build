"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateAttendanceValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/ClientStaff/CreateAttendanceValidator"));
const AttendanceRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/AttendanceRepositoryContract"));
const InvalidCredentialException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/InvalidCredentialException"));
const UserType_1 = global[Symbol.for('ioc.use')]("App/types/UserType");
const Hash_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Attendance_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Attendance"));
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const FaceRecognition_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/FaceRecognition"));
const fs_1 = __importDefault(require("fs"));
class AttendancesController {
    async index({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const attendances = await AttendanceRepositoryContract_1.default.all(request, project);
        return response.json(attendances);
    }
    async store({ response, request, auth }) {
        const authUser = auth.user;
        const project = authUser?.clientStaff.project;
        const data = await request.validate(CreateAttendanceValidator_1.default);
        if (data.username && data.password) {
            const user = await User_1.default.query().where('username', data.username).where('user_type', UserType_1.UserType.client_staff).whereHas('role', (query) => {
                query.where('name', 'guard');
            }).first();
            if (!user)
                throw new InvalidCredentialException_1.default();
            const isValidPassword = await Hash_1.default.verify(user.password, data.password);
            if (!isValidPassword)
                throw new InvalidCredentialException_1.default();
            const attendance = await this.markAttendance(user.id, project.id, data.attendance_through);
            return response.json(attendance);
        }
        else if (data.userId) {
            const user = await User_1.default.query().whereHas('clientStaff', (query) => {
                query.where('project_id', project.id).where('staff_code', data.userId).orWhere('nfc_code', data.userId);
            }).where('user_type', UserType_1.UserType.client_staff).firstOrFail();
            const attendance = await this.markAttendance(user.id, project.id, data.attendance_through);
            return response.json(attendance);
        }
        else if (data.image) {
            const image = data.image;
            const fileName = `${(0, Helpers_1.cuid)()}.${image.extname}`;
            await image.move(Application_1.default.tmpPath(`face/images`), {
                name: fileName
            });
            const uploadedImagePath = Application_1.default.tmpPath('face/images', fileName);
            const isRecognized = await FaceRecognition_1.default.detect(project, uploadedImagePath);
            if (isRecognized) {
                fs_1.default.unlinkSync(uploadedImagePath);
                const attendance = await this.markAttendance(isRecognized.id, project.id, data.attendance_through);
                return response.json(attendance);
            }
            else {
                throw new InvalidCredentialException_1.default();
            }
        }
        else {
            throw new InvalidCredentialException_1.default();
        }
    }
    async markAttendance(userId, projectId, attendance_through) {
        let type;
        const lastAttendance = await Attendance_1.default.query().where('user_id', userId).orderBy('created_at', 'desc').first();
        if (lastAttendance && lastAttendance.type == 'In') {
            type = 'Out';
        }
        else {
            type = 'In';
        }
        const attendanceData = {
            projectId: projectId,
            userId: userId,
            type: type,
            attendanceThrough: attendance_through
        };
        return await AttendanceRepositoryContract_1.default.create(attendanceData);
    }
}
exports.default = AttendancesController;
//# sourceMappingURL=AttendancesController.js.map