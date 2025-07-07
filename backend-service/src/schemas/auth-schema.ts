import { z } from "zod"
import { MetaSchema } from "./meta-schemas.ts"

export const AuthSchema = z.object({
    role: z.number({
        required_error: "Required role for authentication"
    }),
    username: z.string({
        required_error: "Required username for authentication"
    }),
    password: z.string({
        required_error: "Required password for authentication"
    }).min(8, "Password length not valid")
})

export const AuthSessionSchema = AuthSchema.extend({
    password: z.undefined()
})

export const AuthResponseSchema = z.object({
    meta: MetaSchema,
    data: z.union([
        z.object({
            token: z.string()
        }),
        z.array(z.any())
    ])
})

export const NewPasswordResponseSchema = z.object({
    meta: MetaSchema,
    data: z.array(z.any())
})

export const NewPasswordSchema = z.object({
    password: z.string({required_error: "Required new password"}).min(8, "Password length not valid")
})