import type { TCVResponse } from "@/types/cv-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadCvService(token: string): Promise<string | undefined> {
    try{
        const userProfile = await fetchJson<TCVResponse, undefined>(
            baseUrl("/cv"),
            "GET",
            {
                "Authorization": `Bearer ${token}`
            }
        )
        
        return userProfile.data.cv
    }
    catch{
        toast("Gagal memuat informasi profile")
        return
    }
}