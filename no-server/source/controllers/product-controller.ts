import { Request, Response, NextFunction } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import Product from '../models/products';
import Category from '../models/category';
import UploadFileProvider from '../functions/upload-file';
import { FileArray } from 'express-fileupload';

class ProductController {
	public static async createProducts(req: Request, res: Response, next: NextFunction) {
		const { name, images, price, categoryId } = req.body;

		const category = await Category.findOne({ categoryId: categoryId });

		if (!category) {
			return res.status(500).json({
				message: 'Category not exist ',
			});
		}

		const product = new Product({
			name: name,
			images: [],
			price: price,
			categoryId: category._id,
		});

		const reqFiles: FileArray = req.files!;
		let listImageAfterUpload: string[] = [];

		await product
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
				Product.updateOne({ _id: results._id }, newValue).exec()
					.then(updateResult => {
					})
					.catch((err: { message: string }) => {
						return res.status(500).json({
							message: err.message,
						});
					});
				// reference List
				category.listProducts.push(product);
				category.save();
				res.status(200).json({
					id: results.productId,
					message: 'Create success'
				});
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	}

	public static deleteProductById(req: Request, res: Response, next: NextFunction) {
		Product.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) })
			.then((results) => {
				res.status(200).json({
					message: 'Deleted',
				});
			})
			.catch((err) => {
				return res.status(500).json({
					message: err.message,
				});
			});
	}

	public static getAllProducts(req: Request, res: Response, next: NextFunction) {
		Product.find()
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

	public static getProductById(req: Request, res: Response, next: NextFunction) {
		return res.status(200).json({
			message: 'getProductById',
		});
	}
}

export default ProductController;
