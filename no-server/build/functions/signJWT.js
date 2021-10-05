"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = 'Auth';
const signJWT = (user, callback) => {
    const timeSignIn = new Date().getTime();
    const expiredTime = timeSignIn + Number(config_1.default.server.token.expiredTime) * 1000;
    logging_1.default.info(NAMESPACE, `Attempting to sign token for username: ${user.username}`);
    try {
        jsonwebtoken_1.default.sign({
            username: user.username,
        }, config_1.default.server.token.secretKey, {
            issuer: config_1.default.server.token.issuer,
            algorithm: 'HS256',
            expiresIn: expiredTime,
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        logging_1.default.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};
exports.default = signJWT;
