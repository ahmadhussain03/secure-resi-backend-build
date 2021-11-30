"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/WebSocket"));
const WebSocketManager_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/WebSocketManager"));
WebSocket_1.default.boot();
WebSocket_1.default.io.on('connection', (socket) => {
    WebSocketManager_1.default.addSocket(socket);
    socket.on('disconnect', () => {
        WebSocketManager_1.default.removeSocket(socket);
    });
});
//# sourceMappingURL=socket.js.map