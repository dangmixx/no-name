"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const express_validator_1 = require("express-validator");
const createCategorySchema = [(0, express_validator_1.body)('categoryId').notEmpty().withMessage('CategoryId is required')];
exports.createCategorySchema = createCategorySchema;
