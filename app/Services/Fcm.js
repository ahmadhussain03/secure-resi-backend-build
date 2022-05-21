"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require(Application_1.default.configPath('secrue-resi-firebase-adminsdk-crzj9-1f35c9c612.json'));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount)
});
class Fcm {
    constructor(admin, options = null) {
        this.admin = admin;
        if (options) {
            this.options = options;
        }
        else {
            this.options = {
                priority: "high",
                timeToLive: 60 * 60 * 24
            };
        }
    }
    async sendNotification(token, message) {
        try {
            await this.admin.messaging().sendToDevice(token, message.payload, this.options);
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async sendNotifications(tokens, message) {
        try {
            await this.admin.messaging().sendToDevice(tokens, message.payload, this.options);
        }
        catch (e) {
            throw new Error(e);
        }
    }
}
const fcm = new Fcm(firebase_admin_1.default);
exports.default = fcm;
//# sourceMappingURL=Fcm.js.map