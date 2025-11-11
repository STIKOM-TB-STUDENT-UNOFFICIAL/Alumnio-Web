import { deleteAnswer, deleteAnswerBySurveyId, deleteSurvey, getSurveyRepository, insertAnswer, insertSurvey, isAnswerAvailable, pruneUserAnswer, setAnswerSurveyRepository, statisticsUserAnswer, updateAnswer, updateSurvey } from "@/repositories/survey-repository.ts";
import type { TAnswer, TSurvey } from "@/types/survey-type.ts";

export async function getAlumniSurvey(userId?: number){
    if(userId){
        const survey = await getSurveyRepository(userId)
        const tofilter = survey.map(
            (v) => {
            const res: Omit<typeof v, "UserAnswer"> & { UserAnswer?: number | null | typeof v.UserAnswer } = v
            
            res.UserAnswer = v.UserAnswer?.length != 0 ? v.UserAnswer?.[0].answerId : null
            
            return res
        })
        const result = tofilter.filter((a) => a.UserAnswer == null)

        return result
    }
    return await getSurveyRepository()
}

export async function getGraduateUserSurvey(){
    return await getSurveyRepository(undefined, "GRADUATE_USER")
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

export async function setAnswerGraduateUserSurvey(survey: TSurvey[], userId: number){
    const result = survey.map(async (v) => {
        if(v.UserAnswer){
            await setAnswerSurveyRepository(v.id, v.UserAnswer, userId)
        }
    })

    await Promise.all(result)
}

export async function processingAnswerUpdate(answer: TAnswer[]){
    for(let i = 0; i < answer.length; i++){
        switch(answer[i].status){
            case "NEW":
                await pruneUserAnswer(answer[i].id)
                await insertAnswer(answer[i].answer, answer[i].surveyId)
                break
            case "CHANGED":
                await pruneUserAnswer(answer[i].id)
                await updateAnswer(answer[i].answer, answer[i].surveyId, answer[i].id)
                break
            case "DELETED":
                await pruneUserAnswer(answer[i].id)
                await deleteAnswer(answer[i].id)
                break
        }
    }
}

export async function updateSurveyService(survey: TSurvey[]){
    const result = survey.map(async (v) => {
        switch(v.status){
            case "NEW":
                const res = await insertSurvey(v.questions, v.surveyType)
                v.Answer = v.Answer.map((v) => {
                    v.surveyId = res.id
                    return v
                })
                await processingAnswerUpdate(v.Answer)
                break
            case "CHANGED":
                await updateSurvey(v.questions, v.surveyType, v.id)
                await processingAnswerUpdate(v.Answer)
                break
            case "DELETED":
                await deleteAnswerBySurveyId(v.id)
                await deleteSurvey(v.id)
                break
            case "NO_CHANGES":
                await processingAnswerUpdate(v.Answer)
        }
    })

    await Promise.all(result)
}

export async function statisticsService(surveyType: "ALUMNI" | "GRADUATE_USER" = "ALUMNI"){
    return await statisticsUserAnswer(surveyType)
}