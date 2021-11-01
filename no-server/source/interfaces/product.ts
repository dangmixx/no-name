import { Document } from 'mongoose';

export default interface IProduct extends Document {
	productId: number;
	name: string;
	images: string[];
	price: number;
	categoryId: string;
}
