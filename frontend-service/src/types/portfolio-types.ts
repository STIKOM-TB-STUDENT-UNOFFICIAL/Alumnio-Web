import type { TUserInformation } from "./user-profile-types"

export type TPortfolioAttachment = {
    id: number,
    portfolioId: number,
    imageUrl: string
}

export type TPortfolioStack = {
    id: number,
    portfolioId: number,
    title: string
}

export type TPortfolio = {
    id?: number,
    userId?: number,
    title: string,
    description: string,
    demoUrl: string,
    sourceCode: string,
    PortfolioAttachment: TPortfolioAttachment[],
    PortfolioStack: TPortfolioStack[]
}

export type TPortfolioResponse = {
    success?: false,
    meta: {
        status: "SUCCESS" | "FAILED",
        code: number,
        message: string
    },
    data: TPortfolio[]
}

export type TPortfolioUserResponse = {
    success?: false,
    meta: {
        status: "SUCCESS" | "FAILED",
        code: number,
        message: string
    },
    data: {
        user: TUserInformation,
        portfolio: TPortfolio[]
    }
}