import { checkOTP, requestOTP, resetPassword } from "@/services/forgot-service.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function requestOTPHandler(c: Context){
    try{
        const { username, email } = await c.req.json();

        await requestOTP(username, email);
        return c.json({
            meta: generateMeta("SUCCESS", 200, "Successfuly request OTP"),
            data: []
        });
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}

export async function validateOTPHandler(c: Context){
    try{
        const { username, email, otp } = await c.req.json();
        const result = await checkOTP(username, email, otp);

        if (!result.valid) {
            throw new HTTPException(400, { message: "INVALID OTP" })
        }
        return c.json({
            meta: generateMeta("SUCCESS", 200, "OTP VALID"),
            data: []
        });
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}

export async function setPasswordHandler(c: Context){
    try{
        const { username, email, otp, newPassword } = await c.req.json();
        const message = await resetPassword(username, email, otp, newPassword);

        return c.json({
            meta: generateMeta("SUCCESS", 200, message),
            data: []
        });
    }
    catch(e){
        throw new HTTPException(400, { message: (e as Error).message, cause: e })
    }
}