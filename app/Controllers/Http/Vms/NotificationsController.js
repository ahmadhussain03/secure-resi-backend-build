"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StaffNotificationRepositoryContract_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/StaffNotificationRepositoryContract"));
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class NotificationsController {
    async index({ request, response, auth }) {
        const authUser = auth.user;
        const projectId = authUser.clientStaff.projectId;
        const recipientId = authUser.roleId;
        const notifications = await StaffNotificationRepositoryContract_1.default.getNotificationByUser(projectId, recipientId, authUser.id, request);
        return response.json(notifications);
    }
    async store({ request, response, auth }) {
        const authUser = auth.user;
        const recipientId = authUser.roleId;
        const projectId = authUser.clientStaff.projectId;
        const readNotificationSchema = Validator_1.schema.create({
            notificationId: Validator_1.schema.number()
        });
        const data = await request.validate({ schema: readNotificationSchema });
        await StaffNotificationRepositoryContract_1.default.readNotificationByUser(recipientId, authUser.id, projectId, data.notificationId);
        return response.json({ message: "Notification Read Successfully!" });
    }
}
exports.default = NotificationsController;
//# sourceMappingURL=NotificationsController.js.map