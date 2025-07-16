import type { TMeta } from "./meta-type.ts"

export type TPortfolioResponse<T> = {
    meta: TMeta,
    data: T
}

export type TPortfolio = {
    id?: number,
    userId?: number,
    title: string,
    description: string,
    demoUrl: string,
    sourceCode: string
}