import { Access } from "@/middleware/authorization.ts";
import { getAlumniSurvey, getGraduateUserSurvey, setAnswerGraduateUserSurvey, setAnswerSurvey, statisticsService, updateSurveyService } from "@/services/survey-service.ts";
import type { TTokenPayload } from "@/types/auth-type.ts";
import type { TSurvey } from "@/types/survey-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import { jwtDecode } from "@/utils/jwt.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function GetSurvey(c: Context) {
    try {
        const sessionData = jwtDecode<TTokenPayload>(
            c.req.header("Authorization")?.split(" ")[1] as string
        );

        const { type } = c.req.query()

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly fetch survey"),
            data: type == "GRADUATE_USER" ? await getGraduateUserSurvey() : await getAlumniSurvey(sessionData.role != Access.ADMINISTRATOR ? sessionData.userId : undefined)
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
    } catch {
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

export async function GetUserGraduateSurvey(c: Context) {
    try {
        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly patch survey"),
            data: await getGraduateUserSurvey()
        }

        return c.json(result);
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}

export async function PushUserGraduateSurvey(c: Context) {
    try {
        const body: {
            data: TSurvey[],
            userId: number
        } = await c.req.json()

        await setAnswerGraduateUserSurvey(body.data, body.userId)

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly answering survey"),
            data: []
        }

        return c.json(result);
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}