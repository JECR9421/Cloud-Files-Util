import express, { Application, Request, Response } from 'express';
import { uploadFiles } from './controllers/s3.controller';
import bodyParser from 'body-parser';

const app: Application = express();

const PORT: number = 3001;

const router = express.Router();

// app.use('/', (req: Request, res: Response): void => {
//     res.json({test: 'a'});
// });

// TODO CALL uploadFiles DEL CONTROLLER S3.CONTROLLER
app.use(bodyParser.json())
router.post('/upload', async (req: Request, res: Response): Promise<void> => uploadFiles(req, res));

app.use('/api',router);

app.listen(PORT, (): void => {
    console.log('env', process.env);
    console.log('SERVER IS UP ON PORT:', PORT);
});