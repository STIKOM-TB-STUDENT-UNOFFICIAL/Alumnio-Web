import type { TUserProfile } from "@/types/user-profile-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function patchProfileService(token: string, profileData: TUserProfile){
    try{
        await fetchJson(
            baseUrl("/users"), 
            "PATCH", 
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, 
            profileData
        )

        toast("Berhasil mengubah profile")
    }
    catch{
        toast("Gagal mengubah profile")
    }
}