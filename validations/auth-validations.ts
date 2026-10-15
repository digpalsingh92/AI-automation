import * as z from "zod";

const registerInputValidation = z.object({
    username: z.string().min(4, "Username is too short"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password is too short")
})

const loginInputValidation = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password is too short")
})

export { registerInputValidation, loginInputValidation }