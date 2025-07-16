import { deletePortfolio, deletePortfolioAttachment, getPortfolio, getPortfolioAttachment, getPortfolioAttachmentById, insertAttachments, newPortfolio, updatePortfolio, validationPortfolio } from "@/repositories/portfolio-repository.ts";
import type { TPortfolio } from "@/types/portfolio-types.ts";
import { getExtension } from "@/utils/get-extension.ts";
import { generateUuid } from "@/utils/uuid.ts";
import { unlinkSync, writeFileSync } from "fs";
import { HTTPException } from "hono/http-exception";

export async function getPortfolioService(userId: number){
    return await getPortfolio(userId)
}

export async function newPortfolioService(userId: number, portfolio: TPortfolio){
    return await newPortfolio(userId, portfolio)
}

export async function patchPortfolioService(portfolio: TPortfolio){
    return await updatePortfolio(portfolio)
}

export async function deletePortfolioService(id: number){
    const portfolioAttachments = await getPortfolioAttachment(id)
    portfolioAttachments.map((v) => {
        try{
            unlinkSync(`./uploads/images/${v.imageUrl}`)
        }
        catch{
            console.log(`[-] FAILED deleting ${v.imageUrl}`)
        }
    })
    return await deletePortfolio(id)
}

export async function uploadAttachmentService(userId: number, portfolioId: number, attachments: globalThis.File){
    if((await validationPortfolio(userId, portfolioId)) == 0){
        throw new HTTPException(404, { message: "Portfolio not found" })
    }
    const extension = getExtension((attachments as File).name)
    const newName = generateUuid()
    const path = `./uploads/images/attachments_${newName}.${extension}`
    writeFileSync(path, new Uint8Array(await (attachments as File).arrayBuffer()))
    await insertAttachments(portfolioId, `attachments_${newName}.${extension}`)
}

export async function deleteAttachmentService(id: number){
    const portfolio = await getPortfolioAttachmentById(id)
    if(!portfolio){
        throw new HTTPException(404, { message: "Attachment not found" })
    }
    try{
        unlinkSync(`./uploads/images/${portfolio.imageUrl}`)
    }
    catch{
        console.log(`[-] FAILED deleting ${portfolio.imageUrl}`)
    }
    await deletePortfolioAttachment(id)
}