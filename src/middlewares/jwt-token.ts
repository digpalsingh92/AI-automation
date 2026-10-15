import jwt, { type SignOptions } from "jsonwebtoken";
import { config } from "../config/environment.js";

export const generateAccessToken = (userId: string, userInfo: Object) => {
    const token = jwt.sign(
        { userId, userInfo },
        config.JWT_SECRET as string,
        { expiresIn: config.JWT_EXPIRES_AT as NonNullable<SignOptions["expiresIn"]> }
    );
    return token;
};