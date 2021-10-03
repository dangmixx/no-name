import { body } from 'express-validator';
const createCategorySchema = [
    body('id').notEmpty().withMessage('CategoryId is empty'),
];
export { createCategorySchema };
