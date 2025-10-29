import type { TMeta } from "./meta-type.ts"

export type TSurveyResponse<T> = {
    meta: TMeta,
    data: TSurvey[] | T
}

export type TSurvey = {
    id: number,
    questions: string,
    surveyType: "ALUMNI" | "GRADUATE_USER",
    UserAnswer: number | undefined | null,
    Answer: TAnswer[]
}

export type TAnswer = {
    id: number,
    answer: string,
    surveyId: number
}