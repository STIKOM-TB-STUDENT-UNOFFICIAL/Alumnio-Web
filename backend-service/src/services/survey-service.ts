import { getAlumniSurveyRepository, isAnswerAvailable, setAnswerSurveyRepository } from "@/repositories/survey-repository.ts";
import type { TSurvey } from "@/types/survey-type.ts";

export async function getAlumniSurvey(userId?: number){
    if(userId){
        const result = await getAlumniSurveyRepository(userId)
        return result.map(
            (v) => {
            const res: Omit<typeof v, "UserAnswer"> & { UserAnswer?: number | null | typeof v.UserAnswer } = v
            
            res.UserAnswer = v.UserAnswer?.length != 0 ? v.UserAnswer?.[0].id : null
            
            return res
        })
    }
    return await getAlumniSurveyRepository()
}

export async function setAnswerSurvey(survey: TSurvey[], userId: number){
    const result = survey.map(async (v) => {
        const isAnswerAvailableCount = await isAnswerAvailable(v.id, userId)
        if(v.UserAnswer && isAnswerAvailableCount == 0){
            await setAnswerSurveyRepository(v.id, v.UserAnswer, userId)
        }
    })

    await Promise.all(result)
}