"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const s3_controller_1 = require("./controllers/s3.controller");
const app = (0, express_1.default)();
const PORT = 3001;
app.use('/', (req, res) => {
    res.json({ test: 'a' });
});
// TODO CALL uploadFiles DEL CONTROLLER S3.CONTROLLER
app.use('/api/upload', async (req, res) => (0, s3_controller_1.uploadFiles)(req, res));
app.listen(PORT, () => {
    console.log('env', process.env);
    console.log('SERVER IS UP ON PORT:', PORT);
});
