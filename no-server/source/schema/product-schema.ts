import { body } from 'express-validator';
const createProductSchema = [
    body('name').notEmpty().withMessage('Name is empty'),
    body('price').notEmpty().withMessage('Price is empty'),
];
export { createProductSchema };
