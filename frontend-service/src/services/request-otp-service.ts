import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";

export async function requestOTPService(token: string, data: {username: string, email: string})
: Promise<string> 
{
    try{
        await fetchJson<[], typeof data>(
            baseUrl(`/forgot/otp`),
            "POST",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data
        )
        
        return "OTP Telah Terkirim"
    }
    catch (e){
        return (e as Error).message
    }
}