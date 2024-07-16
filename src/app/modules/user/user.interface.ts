import { Model } from "mongoose";


export interface IUser {
    name: string;
    email: string;
    password: string;
}

export interface UserModel extends Model<IUser> {
    // checking if user exists already
    isUserExistsByEmail(id: string): Promise<IUser | null>;
}

