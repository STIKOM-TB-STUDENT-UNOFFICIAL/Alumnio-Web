import { prisma } from "@/libs/db/index.ts";

export async function getSurveyRepository(userId?: number){
    return await prisma.survey.findMany({
        where: {
            surveyType: "ALUMNI"
        },
        ...userId ? {
            include: {
                UserAnswer: {
                    where: {
                        userId: userId
                    }
                }
            }
        } : {}
    })
}