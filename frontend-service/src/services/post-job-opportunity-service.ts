import type { JobType } from "@/types/job-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function postJobOpportunityService(token: string, data: JobType): Promise<undefined> {
    try{
        await fetchJson<unknown, typeof data>(
            baseUrl("/job-opportunity"),
            "POST",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data
        )
        toast("Berhasil membuat lowongan kerja baru")
    }
    catch (e){
        console.log(e)
        console.log(data)
        toast("Gagal membuat lowongan kerja baru")
        return
    }
}