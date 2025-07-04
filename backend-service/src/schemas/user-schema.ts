import { z } from "zod";
import { MetaSchema } from "./meta-schemas.ts";

export const UserWithInformationSchema = z.object({
    id: z.optional(z.number()),
    userId: z.optional(z.number()),
    fullname: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    bio: z.string(),
    classOf: z.string(),
    majorId: z.number(),
    linkedinUrl: z.union([
        z.string(),
        z.null()
    ]),
    curriculumVitae: z.string()
})

export const UserSchema = z.object({
    id: z.optional(z.string()),
    username: z.string(),
    password: z.optional(z.string()),
    role: z.number(),
    UserInformation: z.union([
        UserWithInformationSchema,
        z.array(z.any())
    ])
})

export const UserRegisterSchema = UserSchema.extend({
    id: z.undefined(),
    password: z.string().min(8, "Required password length 8 characters minimum"),
    UserInformation: UserWithInformationSchema.extend({
        id: z.undefined(),
        userId: z.undefined(),
        curriculumVitae: z.undefined(),
        linkedinUrl: z.undefined()
    })
})

export const UserInformationModifySchema = UserWithInformationSchema.extend({
    id: z.undefined(),
    userId: z.undefined(),
    classOf: z.undefined(),
    majorId: z.undefined(),
    curriculumVitae: z.undefined()
})

export const UserResponseSchema = z.object({
    meta: MetaSchema,
    data: z.array(UserSchema)
})

export const CreateUserSchema = z.object({
    meta: MetaSchema,
    data: z.array(z.unknown())
})