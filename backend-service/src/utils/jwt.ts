import type { TTokenPayload } from '@/types/auth-type.ts'
import { decode, sign, verify } from 'hono/jwt'

export async function jwtSign(payload: TTokenPayload){
    return await sign({
        ...payload,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 72
    }, process.env.JWT_KEY ?? "nakano", "HS256")
}

export async function jwtVerify(token: string){
    return await verify(token, process.env.JWT_KEY ?? "nakano", "HS256")
}

export function jwtDecode<T>(token: string): T {
    return decode(token).payload as T
}