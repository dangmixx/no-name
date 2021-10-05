import { body } from 'express-validator';
const createCategorySchema = [
    body('categoryId').notEmpty().withMessage('CategoryId is required'),
];
export { createCategorySchema };
