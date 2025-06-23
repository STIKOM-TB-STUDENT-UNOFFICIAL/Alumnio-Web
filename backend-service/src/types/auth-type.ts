import type { TMeta } from "./meta-type.ts"

export type TAuthResponse = {
    meta: TMeta,
    data: {
        token: string,
    } | []
}

export type TTokenPayload = {
    role: number,
    username: string,
    fullName: string
}

export type TAuthUser = {
    username: string,
    password?: string,
    role: number
}