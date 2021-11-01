import { Document } from 'mongoose';
import IProduct from './product';

export default interface ICategory extends Document {
	categoryId: string;
	name: string;
	images: string[];
	listProducts: IProduct[];
}
