import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config/environment.js";

export const generateToken = (userId: string, userInfo: Object) => {
    if (!config.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    if (!config.JWT_EXPIRES_AT) {
        throw new Error("JWT_EXPIRES_AT is not defined");
    }
    const token = jwt.sign(
        { userId, userInfo },
        config.JWT_SECRET,
        { expiresIn: config.JWT_EXPIRES_AT as NonNullable<SignOptions["expiresIn"]> }
    );
    return token;
};
