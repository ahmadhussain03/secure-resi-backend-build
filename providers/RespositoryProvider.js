"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class RespositoryProvider {
    constructor(application) {
        this.application = application;
    }
    register() {
        const repositoryContracts = fs_1.default.readdirSync(this.application.makePath("app/Repository/Contract"));
        repositoryContracts.forEach(file => {
            const fileNameParts = file.split("Interface");
            const isRepositoryFile = fileNameParts.length > 1 ? true : false;
            if (isRepositoryFile) {
                const contractNamespace = fileNameParts[0] + "Contract";
                const repositoryNamespace = fileNameParts[0];
                const completeContractNamespace = "Adonis/Addons/" + contractNamespace;
                const completeRepositoryNamespace = "App/Repository/Concrete/" + repositoryNamespace;
                this.application.container.singleton(completeContractNamespace, (app) => {
                    return app.make(completeRepositoryNamespace);
                });
            }
        });
    }
    async boot() {
    }
    async ready() {
    }
    async shutdown() {
    }
}
exports.default = RespositoryProvider;
RespositoryProvider.needsApplication = true;
//# sourceMappingURL=RespositoryProvider.js.map