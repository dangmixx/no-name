"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const express_validator_1 = require("express-validator");
const createUserSchema = [(0, express_validator_1.body)('username').notEmpty().withMessage('username is required')];
exports.createUserSchema = createUserSchema;
