
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