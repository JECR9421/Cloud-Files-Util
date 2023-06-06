"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const s3_controller_1 = require("./controllers/s3.controller");
const multer_1 = __importDefault(require("multer"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = 3001;
const router = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors());
router.post('/upload', async (req, res) => (0, s3_controller_1.uploadFiles)(req, res));
const filesRequest = [
    { name: 'file', maxCount: 1 }
];
router.post('/upload-file', upload.fields(filesRequest), async (req, res) => (0, s3_controller_1.uploadFiles)(req, res));
app.use('/api', router);
app.listen(PORT, () => {
    console.log('env', process.env);
    console.log('SERVER IS UP ON PORT:', PORT);
});
