import { z } from "zod";

const usernameSchema = z.string()
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot exceed 20 characters")
    .superRefine((value, ctx) => {
        if (/\s/.test(value)) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Spaces are not allowed. Use '_' or '-' instead.",
            });
        } else if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
            ctx.addIssue({
                code: "custom",
                message:
                    "Only letters, numbers, '_' and '-' are allowed.",
            });
        }
    });

export const registerInputValidation = z.object({
    username: usernameSchema,
    email: z.email("Invalid email"),
    password: z.string().min(6),
});

export const loginInputValidation = z.object({
    username: usernameSchema,
    password: z.string().min(6),
});
