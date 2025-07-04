import { findUserForAuth } from "@/repositories/user-repository.ts";
import type { TTokenPayload, TAuthUser } from "@/types/auth-type.ts";
import { passwordCompare } from "@/utils/bcrypt.ts";
import { jwtVerify } from "@/utils/jwt.ts";
import { HTTPException } from "hono/http-exception";

export async function AuthService(userData: TAuthUser) {
    const user = await findUserForAuth({
        ...userData,
        password: undefined
    })
    if(!user){
        throw new HTTPException(404, {message: "User not found"})
    }
    if(!passwordCompare(userData.password ?? "", user.password)){
        throw new HTTPException(403, {message: "Username or password is wrong"})
    }

    return user
}

export async function AuthGetSessionService(token: string){
    const information = await jwtVerify<TTokenPayload>(token)
    return information
}