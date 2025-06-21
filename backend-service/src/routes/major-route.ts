import { getAllMajor } from "@/handlers/major-handler.ts"
import { MajorResponseSchema } from "@/schemas/major-schema.ts"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver } from "hono-openapi/zod"

export const majorRoute = new Hono()

majorRoute
.get(
    "/",
    describeRoute({
        description: "Get all majors list",
        tags: ["Majors"],
        responses: {
            200: {
                description: "Success get all majors",
                content: {
                    "application/json":{
                        schema: resolver(MajorResponseSchema)
                    }
                }
            }
        }
    }),
    getAllMajor
)