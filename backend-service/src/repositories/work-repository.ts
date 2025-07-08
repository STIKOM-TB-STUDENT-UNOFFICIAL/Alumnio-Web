import { prisma } from "@/libs/db/index.ts";

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