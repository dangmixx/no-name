import express from 'express';
import { UploadedFile } from 'express-fileupload';
class UploadFileRouter {
    uploadFileRouter = express.Router();

    constructor(
    ) {
    }

    public postUploadFileRouter() {
        this.uploadFileRouter.post('uploads', (req, res) => {
            if (req.files) {
                console.log(req.files);
                const file = req.files.file as UploadedFile;
                const fileName = file.name;
                file.mv('./uploads/' + fileName, (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send('File Upload');
                    }
                })
            }
        });
    }
}

export default new UploadFileRouter();
