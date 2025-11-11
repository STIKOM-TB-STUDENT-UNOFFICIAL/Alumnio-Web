import { prisma } from "@/libs/db/index.ts";
import type { JobType } from "@/types/job-type.ts";

export async function getJobOpportunity(q: string){
    return await prisma.jobOpportunity.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: q,
                        mode: "insensitive"
                    }
                },
                {
                    company: {
                        contains: q,
                        mode: "insensitive"
                    }
                },
                {
                    location: {
                        contains: q,
                        mode: "insensitive"
                    }
                },
                {
                    description: {
                        contains: q,
                        mode: "insensitive"
                    }
                }
            ]
        }
    })
}

export async function createJobOpportunity(
    job: Omit<JobType, "id" | "companyLogo" | "postedDate">
){
    return await prisma.jobOpportunity.create({
        data: job
    })
}

export async function patchJobOpportunity(
    job: Omit<JobType, "companyLogo" | "postedDate">
){
    return await prisma.jobOpportunity.update({
        data: {
            ...job,
            id: undefined
        },
        where: {
            id: job.id
        }
    })
}


export async function deleteJobOpportunity(
    id: number
){
    return await prisma.jobOpportunity.delete({
        where: {
            id
        }
    })
}