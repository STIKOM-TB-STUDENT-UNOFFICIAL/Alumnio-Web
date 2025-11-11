import type { TSurvey } from "@/types/survey-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function postGraduateUserService(userId: number, data: TSurvey[]): Promise<undefined> {
    try{
        const payload = {
            data,
            userId
        }
        await fetchJson<unknown, typeof payload>(
            baseUrl("/survey/graduate-user"),
            "POST",
            {
                "Content-Type": "application/json"
            },
            payload
        )
        toast("Berhasil menjawab survey")
    }
    catch{
        toast("Gagal menjawab survey")
        return
    }
}