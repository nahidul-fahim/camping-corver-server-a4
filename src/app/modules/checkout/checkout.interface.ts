import { Types } from "mongoose";

export interface ICartProducts {
    product: Types.ObjectId;
    quantity: number;
}


export interface ICheckout {
    userId: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    deliveryAddress: string;
    cartProducts: ICartProducts[];
};