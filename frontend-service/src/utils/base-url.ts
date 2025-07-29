import { BACKEND_CONFIG } from "@/config";

export function baseUrl(path: string){
    return `${BACKEND_CONFIG.protocol}://${BACKEND_CONFIG.host}${BACKEND_CONFIG.port ? `:${BACKEND_CONFIG.port}` : ""}${path}`
}