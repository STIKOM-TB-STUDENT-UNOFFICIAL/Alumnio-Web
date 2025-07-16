import { prisma } from "@/libs/db/index.ts";
import type { TPortfolio } from "@/types/portfolio-types.ts";

export async function getPortfolio(userId: number){
    return await prisma.portfolio.findMany({
        where: {
            userId
        },
        include: {
            PortfolioAttachment: true,
            PortfolioStack: true
        }
    })
}

export async function newPortfolio(userId: number, portfolio: TPortfolio){
    return await prisma.portfolio.create({
        data: {
            userId,
            ...portfolio
        }
    })
}

export async function updatePortfolio(portfolio: TPortfolio){
    if(!portfolio.id){
        return
    }

    return await prisma.portfolio.update({
        where: {
            id: portfolio.id
        },
        data: {
            ...portfolio
        }
    })
}

export async function getPortfolioAttachment(portfolioId: number){
    return await prisma.portfolioAttachment.findMany({
        where: {
            portfolioId
        }
    })
}

export async function getPortfolioAttachmentById(id: number){
    return await prisma.portfolioAttachment.findFirst({
        where: {
            id
        }
    })
}

export async function deletePortfolio(id: number){
    await prisma.portfolioAttachment.deleteMany({
        where: {
            portfolioId: id
        }
    })
    await prisma.portfolioStack.deleteMany({
        where: {
            portfolioId: id
        }
    })
    return await prisma.portfolio.delete({
        where: {
            id
        }
    })
}

export async function insertAttachments(id: number, fileName: string){
    return await prisma.portfolioAttachment.create({
        data: {
            portfolioId: id,
            imageUrl: fileName
        }
    })
}

export async function validationPortfolio(userId: number, portfolioId: number){
    return await prisma.portfolio.count({
        where:{
            userId,
            id: portfolioId
        }
    })
}

export async function deletePortfolioAttachment(id: number){
    return await prisma.portfolioAttachment.delete({
        where: {
            id
        }
    })
}