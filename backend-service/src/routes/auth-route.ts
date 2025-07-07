import { changePasswordHandler, getAuthSession, postAuthHandler } from "@/handlers/auth-handler.ts"
import { Access, Authorization } from "@/middleware/authorization.ts"
import { AuthResponseSchema, AuthSchema, AuthSessionSchema, NewPasswordResponseSchema, NewPasswordSchema } from "@/schemas/auth-schema.ts"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import {
  resolver,
  validator,
} from 'hono-openapi/zod'

export const authRoute = new Hono()

authRoute.post('/',
    describeRoute({
        description: "Say hello to auth",
        tags: ["Auth"],
        responses: {
            200: {
                description: "Successfully authentication",
                content: {
                    "application/json": {
                        schema: resolver(AuthResponseSchema)        
                    }
                }
            },
        }
    }),
    validator("json", AuthSchema),
    postAuthHandler
)
.get('/',
    describeRoute({
        description: "Get session information",
        tags: ["Auth"],
        responses: {
            200: {
                description: "Successfully get session information",
                content: {
                    "application/json": {
                        schema: resolver(AuthSessionSchema)
                    }
                }
            }
        }
    }),
    getAuthSession
)
.patch('/',
    Authorization([Access.ALUMNI, Access.ADMINISTRATOR]),
    describeRoute({
        description: "Change password",
        tags: ["Auth"],
        responses: {
            200: {
                description: "Successfully change password",
                content: {
                    "application/json": {
                        schema: resolver(NewPasswordResponseSchema)
                    }
                }
            }
        }
    }),
    validator("json", NewPasswordSchema),
    changePasswordHandler
)