import { z } from 'zod'

const ContactSchema = z.object({
    name: z
    .string({required_error:"Name should be required"})
    .min(1, { message: "Name should be required" })
    .max(20, { message: "Length should ba at max 20 characters" }),
    subject: z
        .string({ required_error: "Subject should be required" })
        .min(1, { message: "Subject should be required" })
        .max(255,{message:"Subject should be at max 255 characters"}),
    message: z
        .string()
        .optional()
})

export default ContactSchema;