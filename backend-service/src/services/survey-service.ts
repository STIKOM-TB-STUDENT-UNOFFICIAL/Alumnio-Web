import { getSurveyRepository } from "@/repositories/survey-repository.ts";

export async function getSurvey(userId?: number){
    return await getSurveyRepository(userId)
}