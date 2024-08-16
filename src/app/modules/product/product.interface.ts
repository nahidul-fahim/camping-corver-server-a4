import { Model } from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    quantity: number;
    description: string;
    category: string;
    image: string;
    isDeleted: boolean;
    slug: string;
    rating: number;
}

export interface ProductModel extends Model<IProduct> {
    isProductExists(id: string): Promise<IProduct | null>;
}