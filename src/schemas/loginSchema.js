import { z } from 'zod'

const LoginSchema = z.object({
    email: z
        .string({ required_error: "Email should be required" })
        .min(1, { message: "Email should be required" })
        .email(),
    password: z
        .string({ required_error: "password should be required" })
        .min(6, { message: "Password should be at lest 6 characters" })
        .max(20, { message: "Password should be at max 20 characters" }),
})

export default LoginSchema;