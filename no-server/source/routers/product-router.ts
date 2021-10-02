import express from 'express';
import { getAllProducts, getProductById, createProducts, deleteProductById } from '../controllers/product-controller';

const productRouter = express.Router();

console.log('ProductRouter initialed');
productRouter.get('/list', getAllProducts);
productRouter.get('/productId', getProductById);
productRouter.post('', createProducts);
productRouter.delete('/:id', deleteProductById);

export = productRouter;
