export type TAuth = {
    role: number,
    username: string,
    password: string
}

export type TSessionData = {
    username: string,
    role: number,
    fullName: string,
    userId: number,
    exp: number
}

export type TValidation = {
    success?: false,
    meta: {
        status: "SUCCESS" | "FAILED",
        code: number,
        message: string
    },
    data: TSessionData
}

export type TAuthentication = TValidation & {
    data: {
        token: string
    }
}

export type TResetPasswordResponse = TValidation & {
    data: []
}

export type TResetPassword = {
    password: string
}