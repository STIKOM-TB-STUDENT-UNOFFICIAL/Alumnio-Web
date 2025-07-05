import type { TMeta } from "./meta-type"

export type TAuthResponse = {
    meta: TMeta,
    data: {
        token: string,
    } | []
}

export type TTokenPayload = {
    userId: number,
    role: number,
    username: string,
    fullName: string
}

export type TAuthUser = {
    username: string,
    password?: string,
    role: number
}