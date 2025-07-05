import type { TMeta, TMetaStatus } from "@/types/meta-type.ts";

export function generateMeta(status: TMetaStatus, code: number, message: string): TMeta {
    return {
        status,
        code,
        message
    }
}