"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebSocketManager {
    constructor() {
        this.socketConnections = [];
    }
    addSocket(socket) {
        this.socketConnections[socket.id] = socket;
    }
    removeSocket(socket) {
        delete this.socketConnections[socket.id];
    }
}
exports.default = new WebSocketManager();
//# sourceMappingURL=WebSocketManager.js.map