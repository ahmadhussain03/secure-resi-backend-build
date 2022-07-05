"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const Env_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Env"));
const User_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/User"));
const Helpers_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Helpers");
const InvalidCredentialException_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Exceptions/InvalidCredentialException"));
const createReadStream = require('fs').createReadStream;
const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");
const key = Env_1.default.get("FACE_KEY");
const endpoint = Env_1.default.get("FACE_ENDPOINT");
const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new Face.FaceClient(credentials, endpoint);
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
class FaceRecognition {
    static async train(_user, _project, _image) {
        return new Promise((resolve, _) => {
            resolve((0, Helpers_1.cuid)());
        });
    }
    static async recognize(userId, image) {
        const userImagePath = Application_1.default.tmpPath(`profile/images/${userId}`);
        const name = await exec(`face_recognition '${userImagePath}' '${image}' | cut -d ',' -f2`);
        const result = name.stdout.trim().split("\n");
        return result.includes(userId.toString());
    }
    static async detect(project, image) {
        const personGroupId = "project_" + project.id;
        let detected_faces = await client.face.detectWithStream(() => createReadStream(image), {
            detectionModel: "detection_03",
            recognitionModel: "recognition_04"
        });
        let faceIds = detected_faces.map(face => face.faceId);
        if (!faceIds.length)
            throw new InvalidCredentialException_1.default();
        let results = await client.face.identify(faceIds, { personGroupId: personGroupId });
        if (results.length) {
            const personId = results[0].candidates[0].personId;
            const user = await User_1.default.query().where('person_id', personId).first();
            if (user)
                return user;
            else
                throw new InvalidCredentialException_1.default();
        }
        else {
            throw new InvalidCredentialException_1.default();
        }
    }
}
exports.default = FaceRecognition;
//# sourceMappingURL=FaceRecognition.js.map