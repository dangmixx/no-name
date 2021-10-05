"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const counter_1 = __importDefault(require("./counter"));
const ProductSchema = new mongoose_1.Schema({
    productId: { type: Number, unique: true, min: 1 },
    name: { type: String, required: true },
    imageUrl: { type: [String], required: false },
    price: { type: Number, required: false },
    categoryId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Category' },
}, {
    timestamps: true,
});
ProductSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    (0, counter_1.default)('productId', this, next);
});
exports.default = mongoose_1.default.model('Product', ProductSchema);
