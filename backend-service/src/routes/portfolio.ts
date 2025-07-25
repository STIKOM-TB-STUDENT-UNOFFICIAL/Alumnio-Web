import { deletePortfolioAttachmentHandler, deletePortfolioHandler, findPortfolioByUser, getPortfolioHandler, inserPortfolioAttachmentHandler, patchPortfolioHandler, postPortfolioHandler } from "@/handlers/portfolio-handler.ts"
import { Access, Authorization } from "@/middleware/authorization.ts"
import { deletePortfolio } from "@/repositories/portfolio-repository.ts"
import { PortofolioSchema } from "@/schemas/portofolio-schema.ts"
import { Hono } from "hono"
import { validator } from "hono-openapi/zod"

export const portfolioRoute = new Hono()

portfolioRoute
.get(
    "/",
    Authorization([Access.ALUMNI]),
    getPortfolioHandler
)
.post(
    Authorization([Access.ALUMNI]),
    validator("json", PortofolioSchema),
    postPortfolioHandler
)
.patch(
    Authorization([Access.ALUMNI]),
    validator("json", PortofolioSchema),
    patchPortfolioHandler
)
.delete(
    Authorization([Access.ALUMNI]),
    deletePortfolioHandler
)

portfolioRoute
.post(
    "/attachment",
    Authorization([Access.ALUMNI]),
    inserPortfolioAttachmentHandler
)
.delete(
    Authorization([Access.ALUMNI]),
    deletePortfolioAttachmentHandler
)

portfolioRoute
.get(
    "/user",
    findPortfolioByUser
)