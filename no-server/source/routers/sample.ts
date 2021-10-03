import express from 'express';
import { UploadedFile } from 'express-fileupload';
import { sampleHealthCheckController } from '../controllers/sample';

const sampleRouter = express.Router();
console.log('SampleRouter initialed');
sampleRouter.get('', sampleHealthCheckController);
sampleRouter.post('', (req, res) => {
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

export = sampleRouter;
