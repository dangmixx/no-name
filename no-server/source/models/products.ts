import mongoose, { Schema } from 'mongoose';
import IProduct from '../interfaces/product';
import autoIncrementModelID from './counter';
const ProductSchema: Schema = new Schema(
	{
		productId: { type: Number, unique: true, min: 1 },
		name: { type: String, required: true },
		images: { type: [String], required: false },
		price: { type: Number, required: false },
		categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
	},
	{
		timestamps: true,
	}
);

ProductSchema.pre('save', function (next) {
	if (!this.isNew) {
		next();
		return;
	}
	autoIncrementModelID('productId', this, next);
});

export default mongoose.model<IProduct>('Product', ProductSchema);
