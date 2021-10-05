"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user-controller");
const validate_request_schema_1 = require("../middleware/validate-request-schema");
const extractJWT_1 = __importDefault(require("../middleware/extractJWT"));
const user_schema_1 = require("../schema/user-schema");
const userRouter = express_1.default.Router();
console.log('UserRouter initialed');
userRouter.get('/validate', extractJWT_1.default, user_controller_1.UserController.validateToken);
userRouter.get('/getAll', user_controller_1.UserController.getAllUser);
userRouter.post('/login', user_controller_1.UserController.login);
userRouter.post('/logout', user_controller_1.UserController.logout);
userRouter.post('/register', user_schema_1.createUserSchema, [validate_request_schema_1.validateRequestSchema, user_controller_1.UserController.register]);
exports.default = userRouter;
