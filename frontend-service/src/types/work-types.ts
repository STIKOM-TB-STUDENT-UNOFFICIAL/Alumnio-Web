export type TWork = {
    id: number,
    title: string,
    company: string,
    startDate: string,
    endDate: string | null,
    status: "NEW" | "MODIFIED" | "DELETED" | "UNMODIFIED"
}

export type TWorkResponse = {
    success?: false,
    meta: {
        status: "SUCCESS" | "FAILED",
        code: number,
        message: string
    },
    data: TWork[]
}