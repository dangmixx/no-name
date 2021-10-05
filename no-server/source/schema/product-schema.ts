import { body } from 'express-validator';
const createProductSchema = [
    body('name').notEmpty().withMessage('Name is empty'),
    body('price').notEmpty().withMessage('Price is empty'),
];
const createUserSchema = [
    body('username').exists().withMessage('username is exist'),
];
export { createProductSchema, createUserSchema };
