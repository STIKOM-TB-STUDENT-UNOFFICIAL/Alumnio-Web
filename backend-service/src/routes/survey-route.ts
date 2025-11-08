import { GetSurvey, PushSurvey, Statistics, UpdateSurvey } from "@/handlers/survey-handler.ts";
import { Access, Authorization } from "@/middleware/authorization.ts";
import { Hono } from "hono";

export const surveyRoute = new Hono()

surveyRoute.get(
    "/",
    Authorization([Access.ADMINISTRATOR, Access.ALUMNI]),
    GetSurvey
)

surveyRoute.post(
    "/",
    Authorization([Access.ADMINISTRATOR, Access.ALUMNI]),
    PushSurvey
)

surveyRoute.patch(
    "/",
    Authorization([Access.ADMINISTRATOR]),
    UpdateSurvey
)

surveyRoute.get(
    "/stat",
    Authorization([Access.ADMINISTRATOR]),
    Statistics
)