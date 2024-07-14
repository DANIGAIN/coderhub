import { z } from 'zod'

const AccessImageType = ['image/jpg','image/png','image/jpeg']

const CreatUserSchema = z.object({
    name: z
        .string({ required_error: "Name should be required" })
        .min(1, { message: "Name should be required" })
        .max(20, { message: "Length should ba at max 20 characters" }),
    email: z
        .string({ required_error: "Email should be required" })
        .min(1, { message: "Email should be required" })
        .email(),
    password: z
        .string({ required_error: "password should be required" })
        .min(6, { message: "Password should be at lest 6 characters" })
        .max(20, { message: "Password should be at max 20 characters" }),
    phone: z
      .number()
      .min(10,{message:"Phone number should be at lest 10 characters"})
      .max(15,{message:"Phone number should be at max 15 characters"})
      .optional(),
    bio: z
      .string()
      .max(255,{message:"Bio  should be at max 255 characters"})
      .optional(),
    specialist: z
        .string()
        .max(255,{message:"Specialist should be at max 255 characters"})
        .optional(),
    skill: z
        .string()
        .max(255,{message:"Specialist should be at max 255 characters"})
        .optional(),
    image: z
      .any()
      .refine((image) => AccessImageType.includes(image[0]?.type),{message:"Image is only accepted as jpg png jpeg"})
      .refine((image) => image?.size <= 1024 *1024*5,{message:"Image size is at max 5 MB"})
      .optional()
})

export default CreatUserSchema; 