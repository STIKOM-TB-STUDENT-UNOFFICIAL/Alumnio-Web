import { findAllUser, insertNewUser, patchUserInformation } from "@/repositories/user-repository";
import type { TUser, TUserWithInformationUpdateable } from "@/types/user-type.ts";

export async function findAllUserService(){
    return await findAllUser()
}

export async function findUserById(id: number){
    return await findUserById(id)
}

export async function newUserService(user: TUser){
    return await insertNewUser(user)
}

export async function patchUserService(userId: number, userInformation: TUserWithInformationUpdateable){
    return await patchUserInformation(userId, userInformation)
}