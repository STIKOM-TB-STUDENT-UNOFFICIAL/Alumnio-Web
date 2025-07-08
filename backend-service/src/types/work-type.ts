import type { TMeta } from "./meta-type.ts"

export type TWorkResponse<T> = {
    meta: TMeta,
    data: T
}

export type TWork = {
    id: number,
    title: string,
    company: string,
    startDate: string,
    endDate: string | null,
    status: "NEW" | "MODIFIED" | "DELETED" | "UNMODIFIED"
}