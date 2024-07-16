import { Model } from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    images: string;
    isDeleted: boolean;
}

export interface ProductModel extends Model<IProduct> {
    isProductExists(id: string): Promise<IProduct | null>;
}