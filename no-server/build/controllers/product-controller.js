"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const products_1 = __importDefault(require("../models/products"));
const category_1 = __importDefault(require("../models/category"));
class ProductController {
    static createProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, imageUrl, price, categoryId } = req.body;
            const category = yield category_1.default.findOne({ categoryId: categoryId });
            if (!category) {
                return res.status(500).json({
                    message: 'Category not exist ',
                });
            }
            const product = new products_1.default({
                name: name,
                imageUrl: imageUrl,
                price: price,
                categoryId: category._id,
            });
            yield product
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
        });
    }
    static deleteProductById(req, res, next) {
        products_1.default.findOneAndDelete({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) })
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
    static getAllProducts(req, res, next) {
        products_1.default.find()
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
    static getProductById(req, res, next) {
        return res.status(200).json({
            message: 'getProductById',
        });
    }
}
exports.default = ProductController;
