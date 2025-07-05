import { type TTokenPayload } from "@/types/auth-type"
import { jwtVerify } from "@/utils/jwt"
import type { Context, Next } from "hono"
import { HTTPException } from "hono/http-exception"

export const Access = {
    ADMINISTRATOR: 0,
    ALUMNI: 1
}

export function Authorization(access: number[]){
    return async(c: Context, next: Next) => {
        if(!c.req.header("Authorization")){
            throw new HTTPException(403, { message: "Access Forbidden" })
        }
        try {
            const token = c.req.header("Authorization")?.split(" ")[1]
            const v = await jwtVerify<TTokenPayload>(token as string)
            if(!access.includes(v.role)){
                throw new HTTPException(403, { message: "Access Forbidden" })
            }

            await next()
        }
        catch {
            throw new HTTPException(403, { message: "Access Forbidden" })
        }
    }
}