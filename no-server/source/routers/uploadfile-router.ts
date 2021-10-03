import express from 'express';
import { UploadedFile } from 'express-fileupload';

const uploadFileRouter = express.Router();
uploadFileRouter.post('uploads', (req, res) => {
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

export = uploadFileRouter;
