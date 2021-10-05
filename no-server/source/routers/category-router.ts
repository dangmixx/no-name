import express from 'express';
import CategoryController from '../controllers/category-controller';
import { validateRequestSchema } from '../middleware/validate-request-schema';
import { createCategorySchema } from '../schema/category-schema';

const categoryRouter = express.Router();

console.log('CategoryRouter initialed');

categoryRouter.post('', createCategorySchema, [validateRequestSchema, CategoryController.createCategories]);

categoryRouter.get('/list', CategoryController.getAllCategories);
categoryRouter.get('/productsByCategory', CategoryController.getAllProductOnCategory);
categoryRouter.get('/productsByCategory/:id', CategoryController.getAllProductByCategoryId);

export default categoryRouter;
