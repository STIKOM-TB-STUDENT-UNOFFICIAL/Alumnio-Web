import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";

export async function validateOTPService(token: string, data: {username: string, email: string, otp: string})
: Promise<string> 
{
    try{
        await fetchJson<[], typeof data>(
            baseUrl(`/forgot/otp-validate`),
            "POST",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data
        )
        
        return "OTP Telah Terverifikasi"
    }
    catch (e){
        return (e as Error).message
    }
}