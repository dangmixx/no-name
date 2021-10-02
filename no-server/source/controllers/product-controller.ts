import { Request, Response, NextFunction } from 'express';
import mongoose, { ObjectId } from 'mongoose';
import Product from '../models/products';
import autoIncrementModelID from '../models/counter';

const createProducts = (req: Request, res: Response, next: NextFunction) => {
	const {
		name,
		imageUrl,
		price
	} = req.body;
	const product = new Product({
		name: name,
		imageUrl: imageUrl,
		price: price
	});
	product.save()
		.then(results => {
			res.status(200).json({
				product: results
			})
		})
		.catch((err) => {
			return res.status(500).json({
				message: err.message,
			});
		});

};

const deleteProductById = (req: Request, res: Response, next: NextFunction) => {
	Product.findOneAndDelete({ _id: new mongoose.Types.ObjectId(req.params.id) })
		.then(results => {
			res.status(200).json({
				message: 'Deleted'
			})
		})
		.catch((err) => {
			return res.status(500).json({
				message: err.message,
			});
		});

};

const getAllProducts = (req: Request, res: Response, next: NextFunction) => {
	Product.find().exec()
		.then(results => {
			return res.status(200).json({
				items: results,
				total: results.length
			});
		})
		.catch((err) => {
			return res.status(500).json({
				message: err.message,
			});
		});

};

const getProductById = (req: Request, res: Response, next: NextFunction) => {
	return res.status(200).json({
		message: 'getProductById',
	});
};

export { getAllProducts, getProductById, createProducts, deleteProductById };
