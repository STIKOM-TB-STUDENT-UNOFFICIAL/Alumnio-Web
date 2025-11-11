import { prisma } from "@/libs/db/index.ts";

export async function getSurveyRepository(userId?: number, surveyType: "ALUMNI" | "GRADUATE_USER" = "ALUMNI"){
    return await prisma.survey.findMany({
        where: {
            surveyType
        },
        
        include: {
            ...userId ? {
                UserAnswer: {
                    where: {
                        userId: userId
                    }
                },
            } : {},
            Answer: userId ? {
                orderBy: {
                    id: "asc"
                }
            } : {
                include: {
                    _count: {
                        select: {
                            UserAnswer: true
                        }
                    }
                },
                orderBy: {
                    id: "asc"
                }
            }
        },

        orderBy: {
            id: "asc"
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

export async function insertSurvey(questions: string, surveyType: "ALUMNI" | "GRADUATE_USER"){
    return await prisma.survey.create({
        data: {
            questions,
            surveyType
        }
    })
}

export async function updateSurvey(questions: string, surveyType: "ALUMNI" | "GRADUATE_USER", surveyId: number){
    return await prisma.survey.update({
        where: {
            id: surveyId
        },
        data: {
            questions,
            surveyType
        }
    })
}

export async function deleteSurvey(surveyId: number){
    return await prisma.survey.delete({
        where: {
            id: surveyId
        }
    })
}

export async function insertAnswer(answer: string, surveyId: number){
    return await prisma.answer.create({
        data: {
            answer,
            surveyId
        }
    })
}

export async function updateAnswer(answer: string, surveyId: number, answerId: number){
    return await prisma.answer.update({
        where: {
            id: answerId
        },
        data: {
            answer,
            surveyId
        }
    })
}

export async function deleteAnswer(answerId: number){
    return await prisma.answer.delete({
        where: {
            id: answerId
        }
    })
}

export async function deleteAnswerBySurveyId(surveyId: number){
    const answer = await prisma.answer.findMany({
        where: {
            surveyId
        }
    })

    await Promise.all(answer.map(async (v) => {
        await pruneUserAnswer(v.id)
    }))

    return await prisma.answer.deleteMany({
        where: {
            surveyId: surveyId
        }
    })
}

export async function pruneUserAnswer(answerId: number){
    return await prisma.userAnswer.deleteMany({
        where: {
            answerId
        }
    })
}

export async function statisticsUserAnswer(surveyType: "ALUMNI" | "GRADUATE_USER"){
    return await prisma.survey.findMany({
        include: {
            Answer: {
                include: {
                    _count: {
                        select: {
                            UserAnswer: true
                        }
                    }
                }
            }
        },
        where: {
            surveyType
        }
    })
}