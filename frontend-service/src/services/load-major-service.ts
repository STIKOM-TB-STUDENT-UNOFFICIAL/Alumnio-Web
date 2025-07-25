import type { TMajorResponse } from "@/types/major-types";
import type { TMajor } from "@/types/user-profile-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadMajorService(token: string): Promise<TMajor[] | undefined> {
    try{
        const userProfile = await fetchJson<TMajorResponse, undefined>(
            baseUrl("/majors"),
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