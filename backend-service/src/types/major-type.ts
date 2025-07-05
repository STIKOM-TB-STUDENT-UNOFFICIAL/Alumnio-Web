import type { TMeta } from "./meta-type"

export type TMajorResponse<T> = {
    meta: TMeta,
    data: T
}