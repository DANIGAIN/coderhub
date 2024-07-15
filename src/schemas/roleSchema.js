import { z } from 'zod'

const CreateRoleSchema = z.object({
    name: z
        .string({ required_error: "Name should be required" })
        .min(1, { message: "Name should be required" })
        .max(20, { message: "Name length should ba at max 20 characters" }),
    isActive: z
        .boolean()
        .optional(),
})
const UpdateRoleSchema = z.object({
    name: z
    .string({ required_error: "Name should be required" })
    .min(1, { message: "Name should be required" })
    .max(20, { message: "Name length should ba at max 20 characters" }),
isActive: z
    .boolean()
    .optional(),
 
})

export { CreateRoleSchema ,UpdateRoleSchema }; 