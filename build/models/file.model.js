"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    constructor(bucket, fileName, base64) {
        this.bucket = bucket;
        this.fileName = fileName;
        this.base64 = base64 || '';
    }
}
exports.File = File;
;
