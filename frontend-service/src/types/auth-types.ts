export type TAuth = {
    role: number,
    username: string,
    password: string,
    userId: number
}

export type TSessionData = {
    username: string,
    role: number,
    fullName: string,
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