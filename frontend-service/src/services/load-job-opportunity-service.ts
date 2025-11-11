import type { JobType } from "@/types/job-types"
import { baseUrl } from "@/utils/base-url"
import { fetchJson } from "@/utils/fetch-json"
import { toast } from "sonner"

export async function loadJobOpportunityService(token: string, q: string)
: Promise<JobType[] | undefined> 
{
    try{
        const jobOpportunity = await fetchJson<{ meta: object, data: JobType[] }, undefined>(
            baseUrl(`/job-opportunity?q=${q}`),
            "GET",
            {
                "Authorization": `Bearer ${token}`
            }
        )
        return jobOpportunity.data
    }
    catch(e){
        toast("Gagal memuat informasi tawaran pekerjaan")
        return
    }
}