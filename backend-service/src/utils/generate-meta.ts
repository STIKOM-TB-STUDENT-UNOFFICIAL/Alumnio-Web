import type { TMeta, TMetaStatus } from "@/types/meta-type.ts";

export function generateMeta(status: TMetaStatus, code: number, message: string, total?: number): TMeta | TMeta & { total: number } {
    return {
        status,
        code,
        message,
        ...(total ? { total } : {})
    }
}