"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = __importDefault(require("../models/category"));
class CategoryController {
    static createCategories(req, res, next) {
        const { categoryId, name, imageUrl } = req.body;
        const product = new category_1.default({
            name: name,
            imageUrl: imageUrl,
            categoryId: categoryId,
        });
        product
            .save()
            .then((results) => {
            res.status(200).json({
                product: results,
            });
        })
            .catch((err) => {
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
    static getAllCategories(req, res, next) {
        category_1.default.find()
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
    static getAllProductOnCategory(req, res, next) {
        category_1.default.find()
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
    static getAllProductByCategoryId(req, res, next) {
        category_1.default.findOne({ categoryId: req.params.id })
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
exports.default = CategoryController;
