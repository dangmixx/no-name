"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequestSchema = void 0;
const express_validator_1 = require("express-validator");
function validateRequestSchema(req, res, next) {
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map((message) => {
                return {
                    message: message.msg,
                    Param: message.param,
                };
            }),
        });
    }
    next();
}
exports.validateRequestSchema = validateRequestSchema;
