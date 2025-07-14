import { getCV, postCV } from "@/handlers/cv-handler.ts"
import { Access, Authorization } from "@/middleware/authorization.ts"
import { Hono } from "hono"

export const cvRoute = new Hono()

cvRoute
.get(
    "/",
    Authorization([Access.ALUMNI]),
    getCV
)
.post(
    Authorization([Access.ALUMNI]),
    postCV
)