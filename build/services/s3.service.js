"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_acl_model_1 = require("../models/s3.acl.model");
const proccessFolder = (folder, fileName) => `${folder}/${fileName}`;
class S3Service {
    constructor(region, endpoint) {
        this.client = new client_s3_1.S3Client({ region, endpoint });
    }
    async upload(bucket, fileContent, fileName, acl = s3_acl_model_1.ACLTypes.private, folder) {
        //TODO PARAM EXPIRES PARA TEMP
        const Key = !folder ? fileName : proccessFolder(folder, fileName);
        const input = { Bucket: bucket, Key, Body: fileContent /* ,ACL:acl.toString() */ };
        const command = new client_s3_1.PutObjectCommand(input);
        const response = await this.client.send(command);
        if (response.ETag)
            return true;
        return false;
    }
}
exports.S3Service = S3Service;
;
