import { DeleteJobOpportunity, GetJobOpportunity, PatchJobOpportunity, PostJobOpportunity } from "@/handlers/job-opportunity-handler.ts";
import { Access, Authorization } from "@/middleware/authorization.ts";
import { Hono } from "hono";

export const jobOpportunityRoute = new Hono()

jobOpportunityRoute.get(
    "/",
    Authorization([Access.ADMINISTRATOR, Access.ALUMNI]),
    GetJobOpportunity
)

jobOpportunityRoute.post(
    "/",
    Authorization([Access.ADMINISTRATOR]),
    PostJobOpportunity
)

jobOpportunityRoute.delete(
    "/",
    Authorization([Access.ADMINISTRATOR]),
    DeleteJobOpportunity
)

jobOpportunityRoute.patch(
    "/",
    Authorization([Access.ADMINISTRATOR]),
    PatchJobOpportunity
)