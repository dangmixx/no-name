import { Document } from 'mongoose';

export default interface IProduct extends Document{
    id: number,
    name: string,
    imageUrl: string,
    price: number
}
