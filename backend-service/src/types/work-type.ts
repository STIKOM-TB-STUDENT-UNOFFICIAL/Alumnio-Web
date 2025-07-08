import type { TMeta } from "./meta-type.ts"

export type TWorkResponse<T> = {
    meta: TMeta,
    data: T
}