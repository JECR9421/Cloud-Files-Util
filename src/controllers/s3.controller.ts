
import { Request, Response } from 'express';
import { ProccessRequests } from '../services/process-request.service';
export async function uploadFiles(req: Request, res: Response): Promise<void>{
    const uploadMannager = new ProccessRequests();
    const result = await uploadMannager.proccessUpload(req);
    res.json(result);
    //TODO CONTROL DE ERRORES
};