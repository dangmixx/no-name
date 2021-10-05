import { body } from 'express-validator';
const createProductSchema = [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').notEmpty().withMessage('Price is required'),
];

export { createProductSchema };
