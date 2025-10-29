import { Access } from "@/middleware/authorization.ts";
import { getAlumniSurvey, setAnswerSurvey } from "@/services/survey-service.ts";
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

        if(sessionData.role == Access.ALUMNI){
            await setAnswerSurvey(await c.req.json(), sessionData.userId)
        }

        return c.json(await c.req.json());
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}