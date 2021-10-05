import { Request, Response, NextFunction } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import Product from '../models/products';
import Category from '../models/category';

class ProductController {
	public static async createProducts(req: Request, res: Response, next: NextFunction) {
		const { name, imageUrl, price, categoryId } = req.body;

		const category = await Category.findOne({ categoryId: categoryId });

		if (!category) {
			return res.status(500).json({
				message: 'Category not exist ',
			});
		}

		const product = new Product({
			name: name,
			imageUrl: imageUrl,
			price: price,
			categoryId: category._id,
		});

		await product
			.save()
			.then((results) => {
				// reference List
				category.listProducts.push(product);
				category.save();
				res.status(200).json({
					product: results,
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
