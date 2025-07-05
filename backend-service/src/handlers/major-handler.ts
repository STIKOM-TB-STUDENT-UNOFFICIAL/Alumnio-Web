import { getAllMajorService } from "@/services/major-service.ts";
import type { TMajorResponse } from "@/types/major-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getAllMajor(c: Context){
    try{
        const majors = await getAllMajorService()
        const response: TMajorResponse<typeof majors> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly get all users"),
            data: majors
        }
        return c.json(response)
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}