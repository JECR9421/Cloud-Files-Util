"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProccessRequests = void 0;
const file_model_1 = require("../models/file.model");
const fs_1 = __importDefault(require("fs"));
const s3_simple_mannager_1 = require("s3-simple-mannager");
// const { AWS_REGION, ENDPOINT } = process.env;
const AWS_REGION = 'us-west-2';
const ENDPOINT = 'https://sfo2.digitaloceanspaces.com';
class ProccessRequests {
    constructor() {
        this.s3Mannager = new s3_simple_mannager_1.S3Service(AWS_REGION, ENDPOINT);
    }
    async proccessUpload(req) {
        const { body, files } = req;
        if (Array.isArray(body)) {
            // do multiple
        }
        if (files) {
            // let test = {};
            // Object.keys(files).forEach((key)=> {
            //    console.log(files[key]);
            // });
            // console.log('files', Object.keys(files), file);
            // @ts-ignore
            body.pathFile = files.file[0].path;
        }
        return await this._createUploadRequest(body);
    }
    async _createUploadRequest(req) {
        try {
            const { bucket, folder, fileName, base64, path, pathFile } = req;
            const file = new file_model_1.File(bucket, fileName, folder, base64);
            const buffer = base64 ? Buffer.from(file.base64, 'base64') : fs_1.default.readFileSync(pathFile);
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
