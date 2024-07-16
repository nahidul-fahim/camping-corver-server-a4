import bcrypt from 'bcrypt';

export const comparePassword = (inputPassword: string, userPassword: string) => {
    return bcrypt.compareSync(inputPassword, userPassword)
}