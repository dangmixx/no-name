import mongoose, { Schema } from "mongoose";
import IProduct from "../interfaces/product";
import autoIncrementModelID from "./counter";
const ProductSchema: Schema = new Schema(
    {
        id: { type: Number, unique: true, min: 1 },
        name: { type: String, required: true },
        imageUrl: { type: String, required: false },
        price: { type: Number, required: false },
    },
    {
        timestamps: true
    }
);

ProductSchema.pre('save', function (next) {
    if (!this.isNew) {
        next();
        return;
    }
    autoIncrementModelID('id', this, next);
});




export default mongoose.model<IProduct>('Product', ProductSchema);;
