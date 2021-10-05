"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uploadFileRouter = express_1.default.Router();
class UploadFileController {
    static postUploadFileRouter(req, res, next) {
        if (req.files) {
            console.log(req.files);
            const file = req.files.file;
            const fileName = file.name;
            file.mv('./uploads/' + fileName, (err) => {
                if (err) {
                    res.send(err);
                }
                else {
                    res.send('File Upload');
                }
            });
        }
    }
}
uploadFileRouter.post('/login', UploadFileController.postUploadFileRouter);
exports.default = uploadFileRouter;
