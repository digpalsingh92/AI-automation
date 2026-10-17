import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";
import type { UserInfo, LoginInput } from "../types/user-types.js";
import { generateAccessToken } from "../middlewares/jwt-token.js";
import {
    BadRequestError,
    ConflictError,
    InternalServerError,
    NotFoundError,
    UnauthorizedError,
} from "../common/app-error.js";

export const userRegistration = async (userInfo: UserInfo) => {
    const { username, email, password } = userInfo;

    if (!username || !email || !password) {
        throw new BadRequestError("Please provide all the required fields");
    }

    const existingUserName = await prisma.user.findUnique({
        where: { username },
    });

    if (existingUserName) {
        throw new ConflictError("Please provide a unique username");
    }

    const existingEmail = await prisma.user.findUnique({
        where: { email },
    });

    if (existingEmail) {
        throw new ConflictError("Please provide a unique email");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    if (!newUser) {
        throw new InternalServerError("Something went wrong, please try again");
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
        throw new BadRequestError("Please provide all the required fields");
    }

    const existingUser = await prisma.user.findUnique({ where: { username } });

    if (!existingUser) {
        throw new NotFoundError("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        throw new UnauthorizedError("Invalid password");
    }

    const token = generateAccessToken(existingUser.id, { username, email: existingUser.email });
    return {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
        token,
    };
};

export const usersProfile = async (userId: string) => {

    if (!userId) {
        throw new BadRequestError("Please provide a user id");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            username: true,
            email: true,
        },
    });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
};
