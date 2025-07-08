import { prisma } from "@/libs/db/index.ts";
import type { TWork } from "@/types/work-type.ts";

export async function getWorkByUserId(userId: number){
    return await prisma.workHistory.findMany({
        where: {
            userId
        },
        orderBy: {
            endDate: "desc"
        }
    })
}

export async function updateWork(id: number, data: Omit<TWork, "id" | "status">){
    return await prisma.workHistory.update({
        where: {
            id
        },
        data
    })
}

export async function postWork(data: (Omit<TWork, "id" | "status"> & { userId: number })[]){
    return await prisma.workHistory.createMany({
        data
    })
}

export async function deleteWork(id: number[]){
    return await prisma.workHistory.deleteMany({
        where: {
            id: {
                in: id
            }
        }
    })
}