export type TMetaStatus = "SUCCESS" | "FAILED"

export type TMeta = {
    status: TMetaStatus,
    message: string,
    code: number
}