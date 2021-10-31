import { FileArray, UploadedFile } from 'express-fileupload';
import path from 'path';
import config from '../config/config';
import fs from 'fs';
// const uploadPath = path.join(__dirname, '../../uploads' + `/${folderName}`);

class UploadFileProvider {
	public static async uploadFile(files: FileArray, refix: string, folderName: string): Promise<any> {

		const uploadPath = path.join(__dirname, `../../uploads/${folderName}`);
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath);
		}
		let listFileUploaded: string[] = [];

		if (Array.isArray(files.imageUrl)) {
			const listFile = files.imageUrl as UploadedFile[];
			await Promise.all(listFile.map(async (file) => {
				await this.saveFile(file, uploadPath, refix).then(result => {
					listFileUploaded.push(result);
				});
			}));
		} else {
			const file = (files.imageUrl as UploadedFile);
			await this.saveFile(file, uploadPath, refix).then(result => {
				listFileUploaded.push(result);
			});
		}
		return {
			status: 200,
			data: listFileUploaded
		};
	}

	private static async saveFile(file: UploadedFile, uploadPath: string, prefix: string): Promise<any> {
		const fileName = prefix + '-' + new Date().getTime() + '.' + file.name.split('.')[1];
		return await new Promise((res, rej) => {
			file.mv(uploadPath + '/' + fileName, (err) => {
				if (err) {
					rej(err);
				} else {
					res(fileName);
				}
			})
		});
	}

}

export default UploadFileProvider;
