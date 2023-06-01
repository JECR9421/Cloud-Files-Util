import express, { Application, Request, Response } from 'express';
import { uploadFiles } from './controllers/s3.controller';

const app: Application = express();

const PORT: number = 3001;

app.use('/', (req: Request, res: Response): void => {
    res.json({test: 'a'});
});

// TODO CALL uploadFiles DEL CONTROLLER S3.CONTROLLER

app.use('/api/upload', async (req: Request, res: Response): Promise<void> => uploadFiles(req, res));

app.listen(PORT, (): void => {
    console.log('env', process.env);
    console.log('SERVER IS UP ON PORT:', PORT);
});