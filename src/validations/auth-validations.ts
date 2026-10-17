import * as z from "zod";

const registerInputValidation = z.object({
    username: z.string().min(4, "Username is too short").trim().transform((val) => val.replace(/\s+/g, '')),
    email: z.email("Invalid email").trim().transform((val) => val.toLowerCase()),
    password: z.string().min(6, "Password is too short")
})

const loginInputValidation = z.object({
    username: z.string().min(4, "Username is too short").trim(),
    password: z.string().min(6, "Password is too short")
})

export { registerInputValidation, loginInputValidation }