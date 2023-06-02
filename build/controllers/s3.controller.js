"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = void 0;
const process_request_service_1 = require("../services/process-request.service");
async function uploadFiles(req, res) {
    try {
        const uploadMannager = new process_request_service_1.ProccessRequests();
        const result = await uploadMannager.proccessUpload(req);
        res.json(result);
        //TODO CONTROL DE ERRORES
    }
    catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
}
exports.uploadFiles = uploadFiles;
;
