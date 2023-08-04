import express, { Application, Request, Response } from 'express';
import { uploadFiles, downloadFiles } from './controllers/s3.controller';
import multer from 'multer';
import bodyParser from 'body-parser';
const cors = require('cors');


const app: Application = express();

const PORT: number = 3001;

const router = express.Router();

const upload = multer({ dest: 'uploads/' }); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
router.post('/upload', async (req: Request, res: Response): Promise<void> => uploadFiles(req, res));
const filesRequest = [
    {name: 'file', maxCount:1}
];
router.post('/upload-file', upload.fields(filesRequest) ,async (req: Request, res: Response): Promise<void> => uploadFiles(req, res));
router.get('/download-file',  async (req: Request, res: Response): Promise<void> => downloadFiles(req, res));
//Todo get con query params para dowload
app.use('/api',router);

app.listen(PORT, (): void => {
    console.log('env', process.env);
    console.log('SERVER IS UP ON PORT:', PORT);
});