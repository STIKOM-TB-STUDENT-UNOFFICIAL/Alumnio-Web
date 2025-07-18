import { prisma } from "@/libs/db/index.ts"

export async function findMajor(){
    return await prisma.major.findMany()
}

export async function insertMajor(major: string){
    return await prisma.major.create({
        data: {
            majorName: major
        }
    })
}