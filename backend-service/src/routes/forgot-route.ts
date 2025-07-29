import { requestOTPHandler, setPasswordHandler, validateOTPHandler } from "@/handlers/forgot-handler.ts"
import { otpRequestSchema, otpValidateSchema, setPasswordSchema } from "@/schemas/forgot-schema.ts"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"

export const forgotRoute = new Hono()

forgotRoute
.post(
    "/otp",
    zValidator("json",otpRequestSchema),
    requestOTPHandler
)
.post(
    "/otp-validate",
    zValidator("json", otpValidateSchema),
    validateOTPHandler
)
.post(
    "/set-password",
    zValidator("json", setPasswordSchema),
    setPasswordHandler
)