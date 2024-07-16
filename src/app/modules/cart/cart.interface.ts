import { Types } from "mongoose";

export interface ICart {
    product: Types.ObjectId;
    user: Types.ObjectId;
    quantity: number;
    date: string;
}