import type { TMeta } from "./meta-type.ts"

export type TMajorResponse<T> = {
    meta: TMeta,
    data: T
}