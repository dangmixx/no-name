"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const express_validator_1 = require("express-validator");
const createProductSchema = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('price').notEmpty().withMessage('Price is required'),
];
exports.createProductSchema = createProductSchema;
