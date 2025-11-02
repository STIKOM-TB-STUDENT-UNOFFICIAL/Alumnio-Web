import type { TSurvey } from "@/types/survey-types"
import { baseUrl } from "@/utils/base-url"
import { fetchJson } from "@/utils/fetch-json"
import { toast } from "sonner"

export async function loadSurveyService(token: string)
: Promise<TSurvey[] | undefined> 
{
    try{
        const userProfile = await fetchJson<{ meta: object, data: TSurvey[] }, undefined>(
            baseUrl(`/survey`),
            "GET",
            {
                "Authorization": `Bearer ${token}`
            }
        )
        return userProfile.data
    }
    catch(e){
        toast("Gagal memuat informasi survey")
        console.log(e)
        return
    }
}