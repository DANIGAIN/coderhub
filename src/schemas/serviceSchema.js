import { z } from 'zod'
const CreateServiceSchema = z.object({
    category: z
        .string({ required_error: "Please choice a category name" })
        .min(1, { message: "Category name should be required" }),
    price: z
        .string({ required_error: "Please put service price" })
        .min(1, { message: "Price should be required" })
        .max(6, { message: "Price should ba at max 6 digit " }),
    time: z
        .string({ required_error: "Time should be required" })
        .min(1, { message: "Time should be required" }),
    type: z
        .enum(['small', 'medium', 'large'],{message:"Please select project type"}),
})
const UpdateServiceSchema = z.object({
    category: z
        .string({ required_error: "Name should be required" })
        .min(1, { message: "Name should be required" }),
    price: z
        .string({ required_error: "Price should be required" })
        .min(1, { message: "Price should be required" })
        .max(6, { message: "Price should ba at max 6 digit " }),
    time: z
        .string({ required_error: "Time should be required" })
        .min(1, { message: "Time should be required" }),
    type: z
        .enum(['small', 'medium', 'large']),
})

export { CreateServiceSchema, UpdateServiceSchema }
