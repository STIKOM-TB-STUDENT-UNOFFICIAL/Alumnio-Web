import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";

export async function resetPasswordService(
    token: string, 
    data: {
        username: string, 
        email: string, 
        otp: string, 
        newPassword: string
    }
)
: Promise<string> 
{
    try{
        await fetchJson<[], typeof data>(
            baseUrl(`/forgot/set-password`),
            "POST",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data
        )
        
        return "Password telah berhasil diubah"
    }
    catch (e){
        return (e as Error).message
    }
}