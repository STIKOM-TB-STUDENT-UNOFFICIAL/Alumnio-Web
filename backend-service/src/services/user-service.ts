import { findAllUser, findUserById, hasProfilePict, insertNewUser, patchUserInformation, updateProfilePict } from "@/repositories/user-repository.ts";
import type { TUser, TUserWithInformationUpdateable } from "@/types/user-type.ts";
import { getExtension } from "@/utils/get-extension.ts";
import { generateUuid } from "@/utils/uuid.ts";
import { rmSync, writeFileSync } from "fs";

export async function findAllUserService(q: string, take: number, skip: number){
    return (await findAllUser(
        q,
        take,
        skip
    )).map(({password, role, ...rest}) => {
        return {
            ...rest,
            WorkHistory: rest.WorkHistory.map(({id, userId, ...rst}) => rst)
        }
    })
}

export async function findUserByIdService(id: number){
    return await findUserById(id)
}

export async function newUserService(user: TUser){
    return await insertNewUser(user)
}

export async function patchUserService(userId: number, userInformation: TUserWithInformationUpdateable){
    return await patchUserInformation(userId, userInformation)
}

export async function uploadProfilePictService(userId: number, image: globalThis.File){
    const previousProfilePict = await hasProfilePict(userId)
    if(previousProfilePict){
        try{
            rmSync(`./uploads/images/${previousProfilePict}`)
        }
        catch(e: unknown){
            console.log(`Error : ${(e as Error).message}`)
        }
    }
    const extension = getExtension((image as File).name)
    const newName = generateUuid()
    const path = `./uploads/images/${newName}.${extension}`
    writeFileSync(path, new Uint8Array(await (image as File).arrayBuffer()))
    await updateProfilePict(userId, `${newName}.${extension}`)
}