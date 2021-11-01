import { Request, Response, NextFunction } from 'express';
import { FileArray } from 'express-fileupload';
import UploadFileProvider from '../functions/upload-file';
import Category from '../models/category';
class CategoryController {
	public static async createCategories(req: Request, res: Response, next: NextFunction) {
		const { categoryId, name, images } = req.body;
		const reqFiles: FileArray = req.files!;
		let listImageAfterUpload: string[] = [];
		const category = new Category({
			name: name,
			images: [],
			categoryId: categoryId,
		});

		category
			.save()
			.then(async (results) => {
				await UploadFileProvider.uploadFile(reqFiles, categoryId, 'category').then(
					(result: { status: number, message?: any, data?: any }) => {
						if (result.status === 500) {
							return res.status(500).json({
								message: result.message,
							});
						}
						if (result.status === 200) {
							listImageAfterUpload = result.data;
						}
					}
				);
				const newValue = {
					$set: {
						images: listImageAfterUpload
					}
				}
				Category.updateOne({ _id: results._id }, newValue).exec()
					.then(updateResult => {
					})
					.catch((err: { message: string }) => {
						return res.status(500).json({
							message: err.message,
						});
					});

			})
			.catch((err: { message: string }) => {
				if (err.message.includes('E11000')) {
					return res.status(500).json({
						message: `CategoryId ${categoryId} existed`,
						value: categoryId,
					});
				}
				return res.status(500).json({
					message: err.message,
				});
			});
	}

	public static getAllCategories(req: Request, res: Response, next: NextFunction) {
		Category.find()
			.exec()
			.then((results) => {
				return res.status(200).json({
					items: results,
					total: results.length,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	}

	public static getAllProductOnCategory(req: Request, res: Response, next: NextFunction) {
		Category.find()
			.populate('listProducts')
			.exec()
			.then((results) => {
				return res.status(200).json({
					items: results,
					total: results.length,
				});
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	}

	public static getAllProductByCategoryId(req: Request, res: Response, next: NextFunction) {
		Category.findOne({ categoryId: req.params.id })
			.populate('listProducts')
			.exec()
			.then((results) => {
				return res.status(200).json(results);
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	}
}

export default CategoryController;
