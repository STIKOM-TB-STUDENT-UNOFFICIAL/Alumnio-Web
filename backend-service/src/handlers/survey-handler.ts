import { Access } from "@/middleware/authorization.ts";
import { getAlumniSurvey, setAnswerSurvey, statisticsService, updateSurveyService } from "@/services/survey-service.ts";
import type { TTokenPayload } from "@/types/auth-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import { jwtDecode } from "@/utils/jwt.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function GetSurvey(c: Context) {
    try {
        const sessionData = jwtDecode<TTokenPayload>(
            c.req.header("Authorization")?.split(" ")[1] as string
        );

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly fetch survey"),
            data: await getAlumniSurvey(sessionData.role != Access.ADMINISTRATOR ? sessionData.userId : undefined)
        }

        return c.json(result);
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}

export async function PushSurvey(c: Context){
    try {
        const sessionData = jwtDecode<TTokenPayload>(
            c.req.header("Authorization")?.split(" ")[1] as string
        );

        await setAnswerSurvey(await c.req.json(), sessionData.userId)

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly answering survey"),
            data: []
        }

        return c.json(result);
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}

export async function UpdateSurvey(c: Context){
    try {
        await updateSurveyService(await c.req.json())

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly patch survey"),
            data: []
        }

        return c.json(result);
    } catch (e) {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}

export async function Statistics(c: Context){
    try {
        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly patch survey"),
            data: await statisticsService()
        }

        return c.json(result);
    } catch (e) {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}