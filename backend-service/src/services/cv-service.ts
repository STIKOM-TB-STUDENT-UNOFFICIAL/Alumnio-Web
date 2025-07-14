import { findUserById, updateCv } from "@/repositories/user-repository.ts";
import { getExtension } from "@/utils/get-extension.ts";
import { generateUuid } from "@/utils/uuid.ts";
import { unlinkSync, writeFileSync } from "fs";
import { HTTPException } from "hono/http-exception";

export async function getCvService(userId: number){
    const user = await findUserById(userId)
    if(!user){
        throw new HTTPException(403, { message: "User not found" })
    }
    return user.UserInformation?.curriculumVitae
}

export async function postCvService(userId: number, cv: globalThis.File){
    const user = await findUserById(userId)
    if(!user){
        throw new HTTPException(403, { message: "User not found" })
    }
    if(user.UserInformation?.curriculumVitae != ""){
        try{
            unlinkSync(`./uploads/documents/${user.UserInformation?.curriculumVitae}`)
        }
        catch(e: unknown){
            console.log(`Error : ${(e as Error).message}`)
        }
    }
    const path = `./uploads/documents/${(cv as File).name}`
    writeFileSync(path, new Uint8Array(await (cv as File).arrayBuffer()))
    return (await updateCv(userId, `${(cv as File).name}`)).curriculumVitae
}