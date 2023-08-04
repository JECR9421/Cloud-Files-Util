"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFiles = exports.uploadFiles = void 0;
const process_request_service_1 = require("../services/process-request.service");
async function uploadFiles(req, res) {
    try {
        const uploadMannager = new process_request_service_1.ProccessRequests();
        const result = await uploadMannager.proccessUpload(req);
        res.json(result);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}
exports.uploadFiles = uploadFiles;
;
async function downloadFiles(req, res) {
    try {
        const downloadMannager = new process_request_service_1.ProccessRequests();
        const { bucket, folder, fileName, base64 } = req.query;
        const downloadAsBase64 = base64 === 'true' ? true : false;
        const result = await downloadMannager._downLoadFile({ bucket, folder, fileName, downloadAsBase64 });
        if (downloadAsBase64) {
            res.json({ result });
        }
        else {
            res.download(result);
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
}
exports.downloadFiles = downloadFiles;
;
