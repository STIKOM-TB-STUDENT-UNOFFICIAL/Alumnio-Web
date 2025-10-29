import { prisma } from "@/libs/db/index.ts";

export async function getAlumniSurveyRepository(userId?: number){
    return await prisma.survey.findMany({
        where: {
            surveyType: "ALUMNI"
        },
        
        include: {
            ...userId ? {
                UserAnswer: {
                    where: {
                        userId: userId
                    }
                },
            } : {},
            Answer: true
        }
    })
}

export async function setAnswerSurveyRepository(surveyId: number, answerId: number, userId: number){
    return await prisma.userAnswer.create({
        data: {
            surveyId,
            answerId,
            userId
        }
    })
}

export async function isAnswerAvailable(surveyId: number, userId: number){
    return await prisma.userAnswer.count({
        where: {
            surveyId,
            userId
        }
    })
}