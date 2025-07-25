import type { TUserInformation, TUserInformationResponse} from "@/types/user-profile-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadUsersService(
    token: string, 
    q: string, 
    major?: string, 
    skip: number = 0, 
    take: number = 100
)
: Promise<{profiles: TUserInformation[], total: number | undefined} | undefined> 
{
    try{
        const userProfile = await fetchJson<TUserInformationResponse, undefined>(
            baseUrl(`/users?q=${q}&take=${take}&skip=${skip}${major? "&major="+major : ""}`),
            "GET",
            {
                "Authorization": `Bearer ${token}`
            }
        )
        return {
            profiles: userProfile.data, 
            total: userProfile.meta.total ?? undefined
        }
    }
    catch{
        toast("Gagal memuat informasi profile")
        return
    }
}