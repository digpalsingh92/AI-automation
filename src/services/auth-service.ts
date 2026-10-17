import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import type { UserInfo, LoginInput } from "../types/user-types.js";
import { generateAccessToken } from "../middlewares/jwt-token.js";

export const userRegistration = async (userInfo: UserInfo) => {
    const { username, email, password } = userInfo;

    if (!username || !email || !password) {
        throw new Error("Please provide all the required fields");
    }

    const existingUserName = await prisma.user.findUnique({
        where: { username },
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

    const token = generateAccessToken(newUser.id, { username, email });
    return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token
    };
};

export const userLogin = async (user: LoginInput) => {
    const { username, password } = user;
    if (!username || !password) {
        throw new Error("Please provide all the required fields")
    }
    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (!existingUser) {
        throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }

    const token = generateAccessToken(existingUser.id, { username, email: existingUser.email });
    return {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        token
    };
}

export const usersProfile = async (userInfo: UserInfo) => {
    const { username } = userInfo;

    if (!username) {
        throw new Error("Please provide a username");
    }

    const user = await prisma.user.findUnique({
        where: { username }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email
    }
}
