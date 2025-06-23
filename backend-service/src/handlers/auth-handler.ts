import { AuthGetSessionService, AuthService } from "@/services/auth-service.ts";
import type { TAuthResponse } from "@/types/auth-type.ts";
import type { TUserResponse } from "@/types/user-type.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import { jwtSign } from "@/utils/jwt.ts";
import type { Context } from "hono";

export async function postAuthHandler(c: Context){
    const user = await AuthService(await c.req.json())

    const response: TAuthResponse = {
        meta: generateMeta("SUCCESS", 200, "Auth successfully"),
        data: {
            token: await jwtSign({
                username: user.username,
                role: user.role,
                fullName: user.UserInformation?.fullname ?? ""
            })
        }
    }

    return c.json(response)
}

export async function getAuthSession(c: Context){
    const information = await AuthGetSessionService(c.req.header("Authorization")?.split(" ")[1] ?? "")

    const response: TUserResponse<typeof information> = {
        meta: generateMeta("SUCCESS", 200, "Success get user information"),
        data: information
    }

    return c.json(response)
}