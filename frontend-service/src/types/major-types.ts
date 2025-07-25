export type TMajor = {
    id: number,
    majorName: string
}

export type TMajorResponse = {
    success?: false,
    meta: {
        status: "SUCCESS" | "FAILED",
        code: number,
        message: string
    },
    data: TMajor[]
}