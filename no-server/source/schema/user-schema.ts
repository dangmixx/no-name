import { body } from 'express-validator';
const createUserSchema = [body('username').notEmpty().withMessage('username is required')];
export { createUserSchema };
