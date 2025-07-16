import { deleteAttachmentService, deletePortfolioService, getPortfolioService, newPortfolioService, patchPortfolioService, uploadAttachmentService } from "@/services/portfolio-service.ts";
import type { TTokenPayload } from "@/types/auth-type.ts";
import type { TPortfolio, TPortfolioResponse } from "@/types/portfolio-types.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import { jwtDecode } from "@/utils/jwt.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function getPortfolioHandler(c: Context){
    try{
        const sessionData = jwtDecode<TTokenPayload>(c.req.header("Authorization")?.split(" ")[1] as string)
        const portfolio = await getPortfolioService(sessionData.userId)

        const response: TPortfolioResponse<typeof portfolio> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly get all portfolio"),
            data: portfolio
        }

        return c.json(response)
    }
    catch{
        throw new HTTPException(400, { message: "Bad Request" })
    }
}

export async function postPortfolioHandler(c: Context){
    try{
        const sessionData = jwtDecode<TTokenPayload>(c.req.header("Authorization")?.split(" ")[1] as string)
        const portfolio: TPortfolio = await c.req.json()

        await newPortfolioService(sessionData.userId, portfolio)

        const response: TPortfolioResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly create new portfolio"),
            data: []
        } 

        return c.json(response)
    }
    catch{
        throw new HTTPException(400, { message: "Bad Request" })
    }
}

export async function patchPortfolioHandler(c: Context){
    try{
        const portfolio: TPortfolio = await c.req.json()

        await patchPortfolioService(portfolio)

        const response: TPortfolioResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly patch portfolio"),
            data: []
        } 

        return c.json(response)
    }
    catch{
        throw new HTTPException(400, { message: "Bad Request" })
    }
}

export async function deletePortfolioHandler(c: Context){
    try{
        const portfolio: TPortfolio = await c.req.json()

        if(!portfolio.id){
            throw new HTTPException(400, { message: "Bad Request" })
        }

        await deletePortfolioService(portfolio.id as number)

        const response: TPortfolioResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly delete portfolio"),
            data: []
        } 

        return c.json(response)
    }
    catch{
        throw new HTTPException(400, { message: "Bad Request" })
    }
}

export async function inserPortfolioAttachmentHandler(c: Context){
    try{
        const sessionData = jwtDecode<TTokenPayload>(c.req.header("Authorization")?.split(" ")[1] as string)
        const { image, portfolioId } = await c.req.parseBody()

        if(!image || !portfolioId){
            throw new HTTPException(400, { message: "Bad Request" })
        }

        await uploadAttachmentService(sessionData.userId, parseInt(portfolioId as string), image as File)

        const response: TPortfolioResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly upload portfolio attachment"),
            data: []
        } 

        return c.json(response)
    }
    catch{
        throw new HTTPException(400, { message: "Bad Request" })
    }
}

export async function deletePortfolioAttachmentHandler(c: Context){
    try{
        const { id } = await c.req.json()

        if(!id){
            throw new HTTPException(400, { message: "Bad Request" })
        }

        await deleteAttachmentService(id)

        const response: TPortfolioResponse<[]> = {
            meta: generateMeta("SUCCESS", 200, "Successfuly delete portfolio attachment"),
            data: []
        } 

        return c.json(response)
    }
    catch{
        throw new HTTPException(400, { message: "Bad Request" })
    }
}