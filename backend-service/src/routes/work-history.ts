import { getWorkHistory, postWorkHistory } from "@/handlers/work-handler.ts";
import { Access, Authorization } from "@/middleware/authorization.ts";
import { WorkSchemaResponse } from "@/schemas/work-schema.ts";
import { Hono } from "hono";
import { describeRoute } from "hono-openapi";
import {
  resolver,
  validator,
} from 'hono-openapi/zod'

export const workRoute = new Hono()

workRoute
.get(
    '/',
    Authorization([Access.ALUMNI, Access.ADMINISTRATOR]),
    describeRoute({
        description: "Get all work history",
        tags: ["Work"],
        responses: {
            200: {
                description: "Sucessfully get all work history",
                content: {
                    "application/json": {
                        schema: resolver(WorkSchemaResponse)
                    }
                }
            }
        }
    }),
    getWorkHistory
)
.post(
    Authorization([Access.ALUMNI]),
    postWorkHistory
)