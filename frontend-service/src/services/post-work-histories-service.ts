import type { TWork } from "@/types/work-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function postWorkHistoriesService(token: string, data: TWork[]): Promise<TWork[] | undefined> {
    try{
        await fetchJson<unknown, { workHistories: TWork[] }>(
            baseUrl("/work-histories"),
            "POST",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            {
                workHistories: data
            }
        )
        toast("Berhasil mengubah informasi riwayat pekerjaan")
    }
    catch(e){
        console.log(e)
        toast("Gagal mengubah informasi riwayat pekerjaan")
        return
    }
}