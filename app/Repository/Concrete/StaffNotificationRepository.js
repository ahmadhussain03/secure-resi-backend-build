"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StaffNotification_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/StaffNotification"));
const RoleRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/RoleRepositoryContract"));
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const StaffNotificationRead_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/StaffNotificationRead"));
class StaffNotificationRepository {
    async getNotificationByRecipient(recipientId, request) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const notifications = await StaffNotification_1.default.query().where('role_id', recipientId).preload('user', (query) => query.preload('profile')).paginate(page, limit);
        return notifications;
    }
    async getNotificationByUser(projectId, recipientId, userId, request) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        const notifications = await StaffNotification_1.default.query().where((query) => {
            query.where('role_id', recipientId).orWhereNull('role_id');
        }).where('project_id', projectId).preload('user', (query) => query.preload('profile')).preload('read', query => query.select(['created_at']).where('user_id', userId)).paginate(page, limit);
        const unreadCount = await Database_1.default.from('staff_notifications').where((query) => {
            query.where('role_id', recipientId).orWhereNull('role_id');
        }).where('project_id', projectId).whereNotExists(Database_1.default.raw('select * from staff_notification_reads where staff_notification_reads.user_id = ' + userId + ' AND staff_notifications.id = staff_notification_reads.staff_notification_id')).count("* as total").first();
        return {
            notifications,
            unread_count: unreadCount.total
        };
    }
    async readNotificationByUser(recipientId, userId, projectId, notificationId) {
        const unreadNotifications = await Database_1.default.from('staff_notifications').where('id', notificationId).where((query) => {
            query.where('role_id', recipientId).orWhereNull('role_id');
        }).where('project_id', projectId).whereNotExists(Database_1.default.raw('select * from staff_notification_reads where staff_notification_reads.user_id = ' + userId + ' AND staff_notifications.id = staff_notification_reads.staff_notification_id'));
        unreadNotifications.forEach(async (notification) => {
            await StaffNotificationRead_1.default.create({
                staffNotificationId: notification.id,
                userId: userId
            });
        });
        return true;
    }
    async getByIdAndProject(id, projectId) {
        return await StaffNotification_1.default.query().where('id', id).where('project_id', projectId).firstOrFail();
    }
    findByIdAndDelete(id) {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    async findByIdAndProjectAndDelete(id, projectId) {
        const notification = await this.getByIdAndProject(id, projectId);
        await notification.delete();
        return true;
    }
    async findByIdAndUpdate(data, id, projectId) {
        const notification = await StaffNotification_1.default.query().where('id', id).where('project_id', projectId).preload('user').preload('recipient').firstOrFail();
        if (data.recipient_id) {
            const recipient = await RoleRepositoryContract_1.default.getById(data.recipient_id);
            notification.recipientId = recipient.id;
        }
        notification.sendDate = data.send_date ? data.send_date : notification.sendDate;
        notification.subject = data.subject ? data.subject : notification.subject;
        notification.comment = data.comment ? data.comment : notification.comment;
        notification.image = data.image ? data.image : notification.image;
        await notification.save();
        return notification;
    }
    async getById(id) {
        return await StaffNotification_1.default.findOrFail(id);
    }
    async allByProjectId(projectId, request) {
        const query = request.qs();
        const page = query.page || 1;
        const limit = query.limit || 15;
        return await StaffNotification_1.default.query().where('project_id', projectId).preload('user', (query) => query.preload('profile')).paginate(page, limit);
    }
    async create(data) {
        if (data.recipient_id) {
            await RoleRepositoryContract_1.default.getById(data.recipient_id);
        }
        return await StaffNotification_1.default.create({
            sendDate: data.send_date,
            recipientId: data.recipient_id ? data.recipient_id : null,
            subject: data.subject,
            userId: data.user_id,
            projectId: data.project_id,
            comment: data.comment,
            image: data.image
        });
    }
}
exports.default = StaffNotificationRepository;
//# sourceMappingURL=StaffNotificationRepository.js.map