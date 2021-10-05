"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_controller_1 = __importDefault(require("../controllers/product-controller"));
const validate_request_schema_1 = require("../middleware/validate-request-schema");
const product_schema_1 = require("../schema/product-schema");
const productRouter = express_1.default.Router();
console.log('ProductRouter initialed');
productRouter.get('/list', product_controller_1.default.getAllProducts);
productRouter.get('/productId', product_controller_1.default.getProductById);
productRouter.delete('/:id', product_controller_1.default.deleteProductById);
productRouter.post('', product_schema_1.createProductSchema, [validate_request_schema_1.validateRequestSchema, product_controller_1.default.createProducts]);
exports.default = productRouter;
