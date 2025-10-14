import { getSurvey } from "@/services/survey-service.ts";
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

        const result = await getSurvey(sessionData.userId)

        return c.json(result);
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}
