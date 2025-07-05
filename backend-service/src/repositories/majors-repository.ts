import { prisma } from "@/libs/db/index"

export async function findMajor(){
    return await prisma.major.findMany()
}