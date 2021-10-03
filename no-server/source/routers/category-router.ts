import express from 'express';
import CategoryController from '../controllers/category-controller';

const categoryRouter = express.Router();

console.log('CategoryRouter initialed');

categoryRouter.post('', CategoryController.createCategories);
categoryRouter.get('/list', CategoryController.getAllCategories);
categoryRouter.get('/productsByCategory', CategoryController.getAllProductOnCategory);
categoryRouter.get('/productsByCategory/:id', CategoryController.getAllProductByCategoryId);

export = categoryRouter;
