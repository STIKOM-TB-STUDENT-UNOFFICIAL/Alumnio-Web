import { findAllUserService, newUserService } from "@/services/user-service.ts";
import type { TUser, TUserResponse } from "@/types/user-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getUsers(c: Context){
    try{
        const users = await findAllUserService()
        const response: TUserResponse<typeof users> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly get all users"),
            data: users
        }
        return c.json(response)
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}

export async function postUsers(c: Context){
    try{
        const formData: TUser = await c.req.json()
        const response: TUserResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly register new user"),
            data: []
        }
        await newUserService(formData)
        return c.json(response)
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}