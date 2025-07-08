import { getWorkHistoriesService } from "@/services/work-service.ts";
import type { TTokenPayload } from "@/types/auth-type.ts";
import type { TWorkResponse } from "@/types/work-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import { jwtDecode } from "@/utils/jwt.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getWorkHistory(c: Context){
    try{
        const sessionData = jwtDecode<TTokenPayload>(c.req.header("Authorization")?.split(" ")[1] as string)
        const workHistory = await getWorkHistoriesService(sessionData.userId)

        const response: TWorkResponse<typeof workHistory> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly get all work histories"),
            data: workHistory
        }

        return c.json(response)
    }
    catch{
        new HTTPException(400, { message: "Bad Request" })
    }
}