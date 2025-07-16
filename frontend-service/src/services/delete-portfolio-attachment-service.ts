import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function deletePortfolioAttachmentService(token: string, id: number): Promise<undefined> {
    try{
        toast("Menghapus attachment portfolio")
        await fetchJson<unknown, { id: number }>(
            baseUrl("/portfolio/attachment"),
            "DELETE",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            {
                id
            }
        )
        toast("Berhasil menghapus attachment portfolio")
    }
    catch{
        toast("Gagal menghapus attachment portfolio")
        return
    }
}