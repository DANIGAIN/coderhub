import { z } from 'zod'

const SignupSchema = z.object({
    name: z
        .string({required_error:"Name should be required"})
        .min(1, { message: "Name should be required" })
        .max(20, { message: "Length should ba at max 20 characters" }),
    email: z
        .string({required_error:"Email should be required"})
        .min(1, { message: "Email should be required" })
        .email(),
    password: z
        .string({required_error:"password should be required"})
        .min(6, { message: "Password should be at lest 6 characters" })
        .max(20, { message: "Password should be at max 20 characters" }),
    confromPassword: z.string({required_error:"Confrom password should be required"})
}).refine((data =>  data.password === data.confromPassword), {
    message: "Passwords do not match",
    path: ['confromPassword']
})

export default SignupSchema;