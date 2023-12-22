import express, { Application, Request, Response } from 'express';
import { uploadFiles, downloadFiles } from './controllers/s3.controller';
import multer from 'multer';
import bodyParser from 'body-parser';
import amqp from "amqplib";
const cors = require('cors');

// Server  expresss
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

// Upload queue
const queue = "upload_queue";
const handleReceiver = async () => {
    try {
        const connection = await amqp.connect("amqp://user:bitnami@209.126.7.137:5008");
        const channel = await connection.createChannel();
    
        process.once("SIGINT", async () => {
          await channel.close();
          await connection.close();
        });
    
        await channel.assertQueue(queue, { durable: false });
        await channel.consume(
          queue,
          (message:any) => {
            if (message) {
              console.log(
                " [x] Received '%s'",
                JSON.parse(message.content.toString())
              );
            }
          },
          { noAck: true }
        );
    
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      } catch (err) {
        console.warn(err);
      }
};
handleReceiver();