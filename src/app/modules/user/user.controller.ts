import { UserServices } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";



// create new user
const createNewUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const result = await UserServices.createUserIntoDb(userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User created successfully",
        data: result
    })
})


export const UserController = { createNewUser };