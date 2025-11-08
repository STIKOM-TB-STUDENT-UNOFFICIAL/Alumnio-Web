import type { TSurvey } from "@/types/survey-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function patchSurveyService(token: string, survey: TSurvey[]){
    try{
        toast("Memperbarui survey")
        await fetchJson(
            baseUrl("/survey"), 
            "PATCH", 
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }, 
            survey
        )

        toast("Berhasil memperbarui survey")
    }
    catch{
        toast("Gagal memperbarui survey")
    }
}