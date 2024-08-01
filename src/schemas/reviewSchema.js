import { z } from 'zod'

const CreateReviewSchema = z.object({
    comment: z
        .string({
            invalid_type_error:"Comment should be string type",
            required_error:"Comment should be required"
        })  
        .min(1, { message: "Comment should be required" })
        .max(255, { message: "Comment should be at max 255" }),
    rating: z
        .string({
             invalid_type_error:"Rating should be required",
            required_error:"Rating should be required"
        })
        .transform((value) => Number(value))
})

export { CreateReviewSchema}; 