import { Types } from "mongoose";

export interface ICartProducts {
    cartId: Types.ObjectId;
    product: Types.ObjectId;
    quantity: number;
};

export interface ICheckout {
    userId: Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    deliveryAddress: string;
    cartProducts: ICartProducts[];
};