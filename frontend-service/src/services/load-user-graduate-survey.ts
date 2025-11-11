import type { TSurvey } from "@/types/survey-types"
import { baseUrl } from "@/utils/base-url"
import { fetchJson } from "@/utils/fetch-json"
import { toast } from "sonner"

export async function loadUserGraduateSurvey()
: Promise<TSurvey[] | undefined> 
{
    try{
        const survey = await fetchJson<{ meta: object, data: TSurvey[] }, undefined>(
            baseUrl(`/survey/graduate-user`),
            "GET"
        )
        return survey.data
    }
    catch(e){
        toast("Gagal memuat informasi survey")
        return
    }
}