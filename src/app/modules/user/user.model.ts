import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { IUser, UserModel } from "./user.interface";


const userSchema = new Schema<IUser, UserModel>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        select: 0,
        required: [true, 'Password is required'],
        minlength: [6, "Password must be at least 6 characters long"],
    },
},
    {
        timestamps: true,
        versionKey: false
    }
);


// hash password before saving into db
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_round)
    );
    next();
})


// set "" after saving password
userSchema.post('save', async function (doc, next) {
    doc.password = "";
    next();
})


// checking if user exists
userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({ email })
};


export const User = model<IUser, UserModel>('User', userSchema)