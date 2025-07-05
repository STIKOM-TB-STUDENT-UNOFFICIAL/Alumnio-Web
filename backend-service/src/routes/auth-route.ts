import { getAuthSession, postAuthHandler } from "@/handlers/auth-handler"
import { AuthResponseSchema, AuthSchema, AuthSessionSchema, NewPasswordSchema } from "@/schemas/auth-schema"
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
    describeRoute({
        description: "Change password",
        tags: ["Auth"],
        responses: {
            200: {
                description: "Successfully change password",
                content: {
                    "application/json": {
                        schema: resolver(NewPasswordSchema)
                    }
                }
            }
        }
    }),
    (c) => c.json({})
)