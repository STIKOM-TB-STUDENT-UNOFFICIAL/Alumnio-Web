import { Access } from "@/middleware/authorization.ts";
import { patchUserInformation } from "@/repositories/user-repository.ts";
import { findAllUserService, findUserByIdService, newUserService, uploadProfilePictService, xlsUserRegisterService } from "@/services/user-service.ts";
import type { TTokenPayload } from "@/types/auth-type.ts";
import type { TUser, TUserResponse, TUserWithInformation } from "@/types/user-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import { jwtDecode } from "@/utils/jwt.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getUsers(c: Context){
    try{
        const sessionData = jwtDecode<TTokenPayload>(c.req.header("Authorization")?.split(" ")[1] as string)
        const { skip, take, q } = c.req.query()
        const users = sessionData.role == Access.ADMINISTRATOR ? 
                    await findAllUserService(q, take ? parseInt(take) : 5, skip ? parseInt(skip) : 0) : 
                    await findUserByIdService(sessionData.userId)
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

export async function patchUser(c: Context){
    try{
        const formData: TUserWithInformation = await c.req.json()
        const sessionData: TTokenPayload = jwtDecode(c.req.header("Authorization")?.split(" ")[1] as string)
        await patchUserInformation(sessionData.userId, formData)
        return c.json({
            meta: generateMeta("SUCCESS", 200, "Successfully modify user information"),
            data: []
        })
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}

export async function uploadProfilePict(c: Context){
    try{
        const { image } = await c.req.parseBody()
        const sessionData: TTokenPayload = jwtDecode(c.req.header("Authorization")?.split(" ")[1] as string)

        if(!(image instanceof globalThis.File)){
            throw new HTTPException(400, { message: "Bad request, should file" })
        }

        await uploadProfilePictService(sessionData.userId, (image as globalThis.File))
        const response: TUserResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly upload profile image"),
            data: []
        }
        return c.json(response)
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e})
    }
}

export async function xlsUpload(c: Context){
    try{
        const { xlsxFile } = await c.req.parseBody()

        await xlsUserRegisterService(xlsxFile as File)
        
        const response: TUserResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly create user from xlsx"),
            data: []
        }
        return c.json(response)
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e})
    }
}