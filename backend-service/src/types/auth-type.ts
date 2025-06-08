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
    
}