"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const s3_controller_1 = require("./controllers/s3.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const PORT = 3001;
const router = express_1.default.Router();
// app.use('/', (req: Request, res: Response): void => {
//     res.json({test: 'a'});
// });
// TODO CALL uploadFiles DEL CONTROLLER S3.CONTROLLER
app.use(body_parser_1.default.json());
router.post('/upload', async (req, res) => (0, s3_controller_1.uploadFiles)(req, res));
app.use('/api', router);
app.listen(PORT, () => {
    console.log('env', process.env);
    console.log('SERVER IS UP ON PORT:', PORT);
});
