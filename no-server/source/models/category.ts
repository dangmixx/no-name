import mongoose, { Schema } from "mongoose";
import ICategory from "../interfaces/category";

const CategorySchema: Schema = new Schema(
    {
        categoryId: { type: String, unique: true, required: true, dropDups: true },
        name: { type: String, required: true },
        imageUrl: { type: [String], required: false },
        listProducts: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'
        }]
    },
    {
        timestamps: true
    }
);


export default mongoose.model<ICategory>('Category', CategorySchema);
