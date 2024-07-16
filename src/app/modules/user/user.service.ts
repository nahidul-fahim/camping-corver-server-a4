import httpStatus from "http-status";
import { User } from "./user.model";
import { IUser } from "./user.interface";
import AppError from "../../error/AppError";



const createUserIntoDb = async (payload: IUser) => {
    // checking if the user exists
    const isExistingUser = await User.isUserExistsByEmail(payload.email)
    if (isExistingUser) {
        throw new AppError(httpStatus.CONFLICT, "The user already exists!")
    }
    const newUser = await User.create(payload);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...others } = newUser.toObject();
    return others;
}


export const UserServices = { createUserIntoDb };