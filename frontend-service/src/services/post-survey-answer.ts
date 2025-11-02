import type { TSurvey } from "@/types/survey-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function postSurveyAnswer(token: string, data: TSurvey[]): Promise<undefined> {
    try{
        await fetchJson<unknown, typeof data>(
            baseUrl("/survey"),
            "POST",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data
        )
        toast("Berhasil menjawab survey")
    }
    catch{
        toast("Gagal menjawab survey")
        return
    }
}