
import { z } from 'zod'

const ForgetPassowrdSchema = z.object({
    email: z
        .string({ required_error: "Email should be required" })
        .min(1, { message: "Email should be required" })
        .email()
})

export default ForgetPassowrdSchema;