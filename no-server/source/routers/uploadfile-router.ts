import express, { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
const uploadFileRouter = express.Router();

class UploadFileController {
	public static postUploadFileRouter(req: Request, res: Response, next: NextFunction) {
		if (req.files) {
			console.log(req.files);
			const file = req.files.file as UploadedFile;
			const fileName = file.name;
			file.mv('./uploads/' + fileName, (err) => {
				if (err) {
					res.send(err);
				} else {
					res.send('File Upload');
				}
			});
		}
	}
}

uploadFileRouter.post('/login', UploadFileController.postUploadFileRouter);

export default uploadFileRouter;
