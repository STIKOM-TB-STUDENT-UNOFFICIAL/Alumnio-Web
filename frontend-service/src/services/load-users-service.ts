import type { TUserInformation, TUserInformationResponse} from "@/types/user-profile-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadUsersService(token: string, q: string): Promise<TUserInformation[] | undefined> {
    try{
        const userProfile = await fetchJson<TUserInformationResponse, undefined>(
            baseUrl(`/users?q=${q}`),
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