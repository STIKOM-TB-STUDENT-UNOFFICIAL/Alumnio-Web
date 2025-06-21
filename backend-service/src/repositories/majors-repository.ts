import { prisma } from "@/libs/db/index.ts"

export async function findMajor(){
    return await prisma.major.findMany()
}