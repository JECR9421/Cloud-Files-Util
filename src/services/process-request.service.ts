
import { Request, Response } from 'express';
import {File} from '../models/file.model';
import { S3Service } from './s3.service';
import fs from 'fs';

// const { AWS_REGION, ENDPOINT } = process.env;
const AWS_REGION = 'us-west-2';
const ENDPOINT = 'https://sfo2.digitaloceanspaces.com';
export class ProccessRequests {
    s3Mannager:S3Service;
    constructor(){
      this.s3Mannager = new S3Service(AWS_REGION, ENDPOINT);
    }
    async proccessUpload(req: Request): Promise<any> {
        const { body, files } = req;
        if(Array.isArray(body)){
            // do multiple
        }

        if(files) { 
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

    async _createUploadRequest(req:any): Promise<boolean>{
        try{
            const { bucket,folder,fileName, base64, path, pathFile } = req;
            const file = new File(bucket, fileName,folder,base64);
            const buffer = base64 ? Buffer.from(file.base64, 'base64') : fs.readFileSync(pathFile);
            const result = await this.s3Mannager.upload(file.bucket,buffer,file.fileName,undefined,path);
            return result;
        }catch (e) {
            throw e; 
        }
    }

};