import express, { NextFunction, Request, Response } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import config from '../config/config';
const uploadFileRouter = express.Router();

class UploadFileController {
	public static uploadProductFileRouter(req: Request, res: Response, next: NextFunction) {

		if (req.files) {
			console.log(req.files);
			// const listFile: FileArray = req.files;
			// await listFile.forEach((file: UploadedFile) => {
			// 	if (file.size > config.file.size) {
			// 		res.send(err);
			// 	}
			// });
			// const fileName = file.name;
			// file.mv('./uploads/' + fileName, (err) => {
			// 	if (err) {
			// 		res.send(err);
			// 	} else {
			// 		res.send('File Upload');
			// 	}
			// });
		}
	}

	// private async uploadMultiFile(listFile: UploadedFile[], path = './uploads/') {
	// 	await listFile.forEach((file: UploadedFile) => {
	// 		if (file.size > config.file.size) {
	// 			resolve.
	// 		}
	// 	});
	// }
}

uploadFileRouter.post('/product', UploadFileController.uploadProductFileRouter);

export default uploadFileRouter;
