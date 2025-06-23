import { getAuthSession, postAuthHandler } from "@/handlers/auth-handler.ts"
import { AuthResponseSchema, AuthSchema, AuthSessionSchema } from "@/schemas/auth-schema.ts"
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