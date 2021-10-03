import express from 'express';
import ProductController from '../controllers/product-controller';

const productRouter = express.Router();

console.log('ProductRouter initialed');
/**
 * @wagger
 * /:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
productRouter.get('/list', ProductController.getAllProducts);
productRouter.get('/productId', ProductController.getProductById);
productRouter.post('', ProductController.createProducts);
productRouter.delete('/:id', ProductController.deleteProductById);

export = productRouter;
