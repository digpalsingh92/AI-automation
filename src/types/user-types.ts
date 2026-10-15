export interface UserInfo {
    username: string;
    email: string;
    password: string;
}

export type LoginInput = Pick<UserInfo, "username" | "password">;