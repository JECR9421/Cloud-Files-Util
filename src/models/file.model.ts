export class File{
    bucket:string;
    fileName:string;
    base64:string;
    constructor(bucket:string, fileName:string, base64?:string ){
        this.bucket = bucket;
        this.fileName = fileName;
        this.base64 = base64 || '';
    }
};