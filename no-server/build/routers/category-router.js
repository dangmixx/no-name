"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_controller_1 = __importDefault(require("../controllers/category-controller"));
const validate_request_schema_1 = require("../middleware/validate-request-schema");
const category_schema_1 = require("../schema/category-schema");
const categoryRouter = express_1.default.Router();
console.log('CategoryRouter initialed');
categoryRouter.post('', category_schema_1.createCategorySchema, [validate_request_schema_1.validateRequestSchema, category_controller_1.default.createCategories]);
categoryRouter.get('/list', category_controller_1.default.getAllCategories);
categoryRouter.get('/productsByCategory', category_controller_1.default.getAllProductOnCategory);
categoryRouter.get('/productsByCategory/:id', category_controller_1.default.getAllProductByCategoryId);
exports.default = categoryRouter;
