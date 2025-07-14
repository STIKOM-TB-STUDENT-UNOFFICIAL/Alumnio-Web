import { getCvService, postCvService } from "@/services/cv-service.ts";
import type { TTokenPayload } from "@/types/auth-type.ts";
import type { TMeta } from "@/types/meta-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import { jwtDecode } from "@/utils/jwt.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getCV(c: Context){
    try{
        const sessionData = jwtDecode<TTokenPayload>(c.req.header("Authorization")?.split(" ")[1] as string)
        const cv = await getCvService(sessionData.userId)
        const response: {
            meta: TMeta,
            data: {
                cv: string
            }
        } = {
            meta: generateMeta("SUCCESS", 200, "Successfuly get CV information"),
            data: {
                cv: cv ? cv : ""
            }
        }
        return c.json(response)
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}

export async function postCV(c: Context){
    try{
        const sessionData = jwtDecode<TTokenPayload>(c.req.header("Authorization")?.split(" ")[1] as string)
        const { cvFile } = await c.req.parseBody()
        if(!(cvFile instanceof File)){
            throw new HTTPException(400, { message: "Bad Request" })
        }
        const cv = await postCvService(sessionData.userId, cvFile as File)
        const response: {
            meta: TMeta,
            data: {
                cv: string
            }
        } = {
            meta: generateMeta("SUCCESS", 200, "Successfuly get CV information"),
            data: {
                cv: cv ? cv : ""
            }
        }
        return c.json(response)
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}