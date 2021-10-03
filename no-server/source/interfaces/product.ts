import { Document } from 'mongoose';

export default interface IProduct extends Document {
    productId: number,
    name: string,
    imageUrl: string[],
    price: number,
    categoryId: string,
}
