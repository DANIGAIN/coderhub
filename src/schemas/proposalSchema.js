import { z } from 'zod'

const CreateProposalUserSchema = z.object({
    type: z
        .enum(['small', 'medium', 'large'], { message: "Type should be medium | small | large" }),
    day: z
        .number({
            required_error: "Day should be required",
            invalid_type_error: "Day should be a number",
        })
        .min(1, { message: "Day should be at least 1 day" })
        .max(365, { message: "Day should be at most 1 year" }),
    title: z
        .string({ required_error: "Title should be required" })
        .min(1, { message: "Title should be required" })
        .max(255, { message: "Title should be at max 255" }),
    description: z
        .string({ required_error: "Description should be required" })
        .min(1, { message: "Description should be required" })
        .max(4096, { message: "Description should be at max 4096" }),
    status: z
        .enum(['painding', 'paid', 'approved'], { message: "status should be painding | paid approved" })
})

const CreateProposalAdminSchema = z.object({
    amount: z
        .number({ required_error: "Amount should be required" })
        .nonnegative(),
})

export { CreateProposalUserSchema, CreateProposalAdminSchema }; 