import type { TUserInformation, TUserInformationResponse} from "@/types/user-profile-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function deleteAdministratorService(token: string, data: {userId: number})
: Promise<TUserInformation[] | undefined> 
{
    try{
        const userProfile = await fetchJson<TUserInformationResponse, typeof data>(
            baseUrl(`/users/admin`),
            "DELETE",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data
        )
        return userProfile.data
    }
    catch{
        toast("Gagal mengubah administrator")
        return
    }
}