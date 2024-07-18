import { z } from 'zod'
const AccessImageType = ['image/jpg', 'image/png', 'image/jpeg']
const CreateCategorySchema = z.object({
    name: z
        .string({ required_error: "Name should be required" })
        .min(1, { message: "Name should be required" })
        .max(255, { message: "Length should ba at max 255 characters" })
        .transform((value) => value.toLowerCase())
        .transform((value) => value.trim()),
    slug: z
        .string()
        .max(255, { message: "Length should ba at max 255 characters" })
        .optional(),
    subcatagory: z
        .string()
        .max(255, { message: "Length should ba at max 255 characters" })
        .optional(),
    status: z
        .boolean(),
    logo: z
        .any()
        .refine(logo => logo[0] ? AccessImageType.includes(logo[0]?.type) : true, { message: "Logo is only accepted as jpg png jpeg" })
        .refine(logo => logo[0] ? (logo[0].size < 1024 * 1024 * 5) : true, { message: "Logo size is at max 5 MB" })
        .optional(),
    image: z
        .any()
        .refine(image => image[0] ? AccessImageType.includes(image[0]?.type) : true, { message: "Image is only accepted as jpg png jpeg" })
        .refine(image => image[0] ? (image[0].size < 1024 * 1024 * 5) : true, { message: "Image size is at max 5 MB" })
        .optional(),
    description: z
        .string({ required_error: "Description is required" })
        .min(1, { message: "Description should be required" })
        .max(2055, { message: "Length should ba at max 255 characters" })

})
const UpdateCategorySchema = z.object({
    name: z
        .string({ required_error: "Name should be required" })
        .min(1, { message: "Name should be required" })
        .max(255, { message: "Length should ba at max 255 characters" })
        .transform((value) => value.toLowerCase())
        .transform((value) => value.trim()),
    slug: z
        .string()
        .max(255, { message: "Length should ba at max 255 characters" })
        .optional(),
    subcatagory: z
        .string()
        .max(255, { message: "Length should ba at max 255 characters" })
        .optional(),
    status: z
        .boolean(),
    description: z
        .string({ required_error: "Description is required" })
        .min(1, { message: "Description should be required" })
        .max(2055, { message: "Length should ba at max 255 characters" })

})

export {CreateCategorySchema ,UpdateCategorySchema}
