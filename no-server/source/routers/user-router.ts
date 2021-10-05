import express, { Request, Response } from 'express';
import { UserController } from '../controllers/user-controller';
import { validateRequestSchema } from '../middleware/validate-request-schema';
import { createUserSchema } from '../schema/product-schema';
import extractJWT from '../middleware/extractJWT';
const userRouter = express.Router();

console.log('UserRouter initialed');

userRouter.get('/validate', extractJWT, UserController.validateToken);
userRouter.get('/getAll', UserController.getAllUser);

userRouter.post('/login', UserController.login);
userRouter.post('/logout', UserController.logout);


userRouter.post(
    '/register',
    createUserSchema,
    [validateRequestSchema, UserController.register]
);


export default userRouter;
