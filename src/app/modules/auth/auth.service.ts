/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { comparePassword } from "./auth.utils";
import { ISignInUser } from "./auth.interface";
import AppError from "../../error/AppError";


// sign in user
const signInUser = async (payload: ISignInUser) => {
    const user = await User.findOne({ email: payload.email }).select("+password");
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!")
    }

    // checking password
    const isPasswordMatched = comparePassword(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect!")
    }

    const { password, ...others } = user.toObject();
    return { others };
}


export const AuthServices = { signInUser };