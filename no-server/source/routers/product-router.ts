import express, { Request, Response } from 'express';
import ProductController from '../controllers/product-controller';
import { validateRequestSchema } from '../middleware/validate-request-schema';
import { createProductSchema } from '../schema/product-schema';

const productRouter = express.Router();

console.log('ProductRouter initialed');

productRouter.get('/list', ProductController.getAllProducts);
productRouter.get('/productId', ProductController.getProductById);
productRouter.post(
    '',
    createProductSchema,
    [
        validateRequestSchema,
        ProductController.createProducts
    ]);
productRouter.delete('/:id', ProductController.deleteProductById);

export = productRouter;
