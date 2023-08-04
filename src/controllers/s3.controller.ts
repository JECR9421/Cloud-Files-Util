
import { Request, Response } from 'express';
import { ProccessRequests } from '../services/process-request.service';
export async function uploadFiles(req: Request, res: Response): Promise<void>{
    try{
        const uploadMannager = new ProccessRequests();
        const result = await uploadMannager.proccessUpload(req);
        res.json(result);
    }catch(e){
        console.error(e);
        res.status(500).send(e);
    }
    
};

export async function downloadFiles(req: Request, res: Response): Promise<void>{
    try{
        const downloadMannager = new ProccessRequests();
        const {bucket,folder,fileName, base64} = req.query;
        const downloadAsBase64 = base64 === 'true' ? true : false
        const result = await downloadMannager._downLoadFile({bucket,folder,fileName,downloadAsBase64 });
        if(downloadAsBase64){
            res.json({result});
        } else {
            res.download(result); 
        }
        
    }catch(e){
        console.error(e);
        res.status(500).json(e);
    }
    
};