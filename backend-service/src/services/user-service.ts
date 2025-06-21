import { findAllUser, insertNewUser } from "@/repositories/user-repository.ts";
import type { TUser } from "@/types/user-type.ts";

export async function findAllUserService(){
    return await findAllUser()
}

export async function newUserService(user: TUser){
    return await insertNewUser(user)
}