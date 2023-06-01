"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProccessRequests = void 0;
const file_model_1 = require("../models/file.model");
const s3_service_1 = require("./s3.service");
// const { AWS_REGION, ENDPOINT } = process.env;
const AWS_REGION = 'us-west-2';
const ENDPOINT = 'sfo2.digitaloceanspaces.com';
class ProccessRequests {
    constructor() {
        this.s3Mannager = new s3_service_1.S3Service(AWS_REGION, ENDPOINT);
    }
    async proccessUpload(req) {
        if (Array.isArray(req.body)) {
            // do multiple
        }
        return await this._createUploadRequest(req);
    }
    async _createUploadRequest(req) {
        try {
            const { bucket, fileName, base64 } = req;
            const file = new file_model_1.File(bucket, fileName, base64);
            const buffer = Buffer.from(file.base64, 'base64');
            const result = await this.s3Mannager.upload(file.bucket, buffer, file.fileName);
            return result;
        }
        catch (e) {
            throw e;
        }
    }
}
exports.ProccessRequests = ProccessRequests;
;
