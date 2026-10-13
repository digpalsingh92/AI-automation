import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import type { UserInfo } from "../types/user-types.js";

export const userRegistration = async (userInfo: UserInfo) => {
    const { username, email, password } = userInfo;

    if (!username || !email || !password) {
        throw new Error("Please provide all the required fields");
    }

    const existingUserName = await prisma.user.findUnique({
        where: { username }
    });

    if (existingUserName) {
        throw new Error("Please provide a unique username");
    }

    const existingEmail = await prisma.user.findUnique({
        where: { email }
    });

    if (existingEmail) {
        throw new Error("Please provide a unique email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });

    if (!newUser) {
        throw new Error("Something went wrong please try again");
    }

    return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
    };
};