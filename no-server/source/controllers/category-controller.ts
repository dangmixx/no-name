import { Request, Response, NextFunction } from 'express';
import Category from '../models/category';

class CategoryController {
    
    public static createCategories(req: Request, res: Response, next: NextFunction) {
        const {
            categoryId,
            name,
            imageUrl
        } = req.body;
        const product = new Category({
            name: name,
            imageUrl: imageUrl,
            categoryId: categoryId
        });
        product.save()
            .then(results => {
                res.status(200).json({
                    product: results
                })
            })
            .catch((err: { message: string }) => {
                if (err.message.includes('E11000')) {
                    return res.status(500).json({
                        message: `CategoryId ${categoryId} existed`,
                        value: categoryId
                    });
                }
                return res.status(500).json({
                    message: err.message,
                });
            });

    };

    public static getAllCategories(req: Request, res: Response, next: NextFunction) {
        Category.find().exec()
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

    public static getAllProductOnCategory(req: Request, res: Response, next: NextFunction) {
        Category.find().populate('listProducts').exec()
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
    }

    public static getAllProductByCategoryId(req: Request, res: Response, next: NextFunction) {
        Category.findOne({ categoryId: req.params.id }).populate('listProducts').exec()
            .then(results => {
                return res.status(200).json(
                    results
                );
            })
            .catch((err) => {
                return res.status(500).json({
                    message: err.message,
                });
            });
    }

}

export default CategoryController;
