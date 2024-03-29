"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
const HealthCheck_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/HealthCheck"));
require("./routes/super_admin");
require("./routes/reseller");
require("./routes/subscriber");
require("./routes/client");
require("./routes/client_staff");
require("./routes/guard");
require("./routes/resident");
require("./routes/visitor");
Route_1.default.group(() => {
    Route_1.default.get('countries', 'CountriesController.index');
    Route_1.default.get('states/:id', 'StatesController.index');
    Route_1.default.get('cities/:id', 'CitiesController.index');
    Route_1.default.post('apk', 'ApksController.store');
}).prefix('api');
Route_1.default.any('/health', async ({ response }) => {
    const report = await HealthCheck_1.default.getReport();
    return report.healthy
        ? response.ok(report)
        : response.badRequest(report);
});
//# sourceMappingURL=routes.js.map