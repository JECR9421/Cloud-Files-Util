
import { Request, Response } from 'express';
import {File} from '../models/file.model';
import { S3Service } from './s3.service';

// const { AWS_REGION, ENDPOINT } = process.env;
const AWS_REGION = 'us-west-2';
const ENDPOINT = 'sfo2.digitaloceanspaces.com';
export class ProccessRequests {
    s3Mannager:S3Service;
    constructor(){
      this.s3Mannager = new S3Service(AWS_REGION, ENDPOINT);
    }
    async proccessUpload(req: Request): Promise<any> {
        if(Array.isArray(req.body)){
            // do multiple
        }
        return await this._createUploadRequest(req);
    }

    async _createUploadRequest(req:any): Promise<boolean>{
        try{
            const { bucket, fileName, base64 } = req;
            const file = new File(bucket, fileName, base64);
            const buffer = Buffer.from(file.base64, 'base64');
            const result = await this.s3Mannager.upload(file.bucket,buffer,file.fileName);
            return result;
        }catch (e) {
            throw e;
        }
    }

};