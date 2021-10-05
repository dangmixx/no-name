"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = __importDefault(require("../models/user"));
const signJWT_1 = __importDefault(require("../functions/signJWT"));
const NAMESPACE = 'USER';
class UserController {
    static validateToken(req, res, next) {
        logging_1.default.info(NAMESPACE, 'Token validated!');
        return res.status(200).json({
            message: 'Token validated!',
        });
    }
    static register(req, res, next) {
        const { username, password } = req.body;
        bcryptjs_1.default.hash(password, 10, (hashError, hash) => {
            if (hashError) {
                return res.status(500).json({
                    message: hashError.message,
                    error: hashError,
                });
            }
            // Insert DB
            const user = new user_1.default({
                username,
                password: hash,
            });
            return user
                .save()
                .then((user) => {
                return res.status(201).json({
                    user,
                });
            })
                .catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error: error,
                });
            });
        });
    }
    static login(req, res, next) {
        const { username, password } = req.body;
        user_1.default.findOne({ username: username })
            .exec()
            .then((users) => {
            if (!users) {
                return res.status(401).json({
                    message: 'User not found',
                });
            }
            bcryptjs_1.default.compare(password, users.password, (error, result) => {
                logging_1.default.debug(NAMESPACE, 'user', { error, result });
                if (error || !result) {
                    return res.status(401).json({
                        message: 'Password not found match',
                    });
                }
                else if (result) {
                    (0, signJWT_1.default)(users, (errorJWT, token) => {
                        logging_1.default.debug(NAMESPACE, 'user', { errorJWT, token });
                        if (errorJWT) {
                            return res.status(401).json({
                                message: 'Unauthorized',
                                error: errorJWT,
                            });
                        }
                        else if (token) {
                            return res.status(200).json({
                                message: 'Auth successfully',
                                token,
                                user: users,
                            });
                        }
                    });
                }
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error,
            });
        });
    }
    static logout(req, res, next) { }
    static getAllUser(req, res, next) {
        user_1.default.find()
            .select('-password')
            .exec()
            .then((users) => {
            return res.status(200).json({
                items: users,
                total: users.length,
            });
        })
            .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error: error,
            });
        });
    }
}
exports.UserController = UserController;
