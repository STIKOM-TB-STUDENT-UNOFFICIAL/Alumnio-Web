import type { TWork, TWorkResponse } from "@/types/work-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadWorkHistoriesService(token: string): Promise<TWork[] | undefined> {
    try{
        const userProfile = await fetchJson<TWorkResponse, undefined>(
            baseUrl("/work-histories"),
            "GET",
            {
                "Authorization": `Bearer ${token}`
            }
        )
        
        return userProfile.data
    }
    catch{
        toast("Gagal memuat informasi profile")
        return
    }
}