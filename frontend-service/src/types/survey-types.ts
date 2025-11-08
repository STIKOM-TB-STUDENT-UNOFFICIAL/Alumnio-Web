export type TSurvey = {
    id: number,
    questions: string,
    surveyType: "ALUMNI" | "GRADUATE_USER",
    UserAnswer: number | undefined | null,
    Answer: TAnswer[],
    status?: "NO_CHANGES" | "CHANGED" | "DELETED" | "NEW"
}

export type TAnswer = {
    id: number,
    answer: string,
    surveyId: number,
    status?: "NO_CHANGES" | "CHANGED" | "DELETED" | "NEW"
    _count?: {
        UserAnswer: number
    }
}