import type { TUserProfile, TUserProfileResponse } from "@/types/user-profile";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadProfileService(token: string): Promise<TUserProfile | undefined> {
    try{
        const userProfile = await fetchJson<TUserProfileResponse, undefined>(
            baseUrl("/users"),
            "GET",
            {
                "Authorization": `Bearer ${token}`
            }
        )
        
        return userProfile.data.UserInformation
    }
    catch{
        toast("Gagal memuat informasi profile")
        return
    }
}