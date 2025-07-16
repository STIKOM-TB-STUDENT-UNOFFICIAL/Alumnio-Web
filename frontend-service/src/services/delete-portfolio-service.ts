import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function deletePortfolio(token: string, id: number): Promise<undefined> {
    try{
        await fetchJson<unknown, { id: number }>(
            baseUrl("/portfolio"),
            "DELETE",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            {
                id
            }
        )
        toast("Berhasil menghapus portfolio")
    }
    catch{
        toast("Gagal menghapus portfolio")
        return
    }
}