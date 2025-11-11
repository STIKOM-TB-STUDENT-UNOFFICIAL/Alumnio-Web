import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function deleteJobOpportunityService(token: string, id: number): Promise<undefined> {
    try{
        await fetchJson<unknown, { id: number }>(
            baseUrl("/job-opportunity"),
            "DELETE",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            {
                id
            }
        )
        toast("Berhasil menghapus lowongan kerja baru")
    }
    catch (e){
        toast("Gagal menghapus lowongan kerja baru")
        return
    }
}