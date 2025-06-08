import { AuthSchema, AuthSchemaResponse } from "@/schemas/auth-schema.ts"
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
                        schema: resolver(AuthSchemaResponse)        
                    }
                }
            },
        }
    }),
    validator("json", AuthSchema),
    (c) => c.text('hello auth')
)