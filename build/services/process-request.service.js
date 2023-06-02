"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProccessRequests = void 0;
const file_model_1 = require("../models/file.model");
const s3_service_1 = require("./s3.service");
const fs_1 = __importDefault(require("fs"));
// const { AWS_REGION, ENDPOINT } = process.env;
const AWS_REGION = 'us-west-2';
const ENDPOINT = 'https://sfo2.digitaloceanspaces.com';
class ProccessRequests {
    constructor() {
        this.s3Mannager = new s3_service_1.S3Service(AWS_REGION, ENDPOINT);
    }
    async proccessUpload(req) {
        const { body } = req;
        if (Array.isArray(body)) {
            // do multiple
        }
        return await this._createUploadRequest(body);
    }
    async _createUploadRequest(req) {
        try {
            const { bucket, folder, fileName, base64, path } = req;
            const file = new file_model_1.File(bucket, fileName, folder, base64);
            const buffer = base64 ? Buffer.from(file.base64, 'base64') : fs_1.default.readFileSync(path);
            const result = await this.s3Mannager.upload(file.bucket, buffer, file.fileName, undefined, path);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.ProccessRequests = ProccessRequests;
;
