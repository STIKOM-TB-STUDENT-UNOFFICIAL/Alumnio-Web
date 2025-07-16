import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function uploadPortfolioAttachmentService(token: string, id: number, file: File): Promise<undefined> {
    try{
        toast("Mengupload attachment portfolio")
        const formData = new FormData()
        formData.append("image", file)
        formData.append("portfolioId", id.toString())
        await fetchJson<unknown, typeof formData>(
            baseUrl("/portfolio/attachment"),
            "POST",
            {
                "Authorization": `Bearer ${token}`
            },
            formData
        )
        toast("Berhasil mengupload attachment portfolio")
    }
    catch{
        toast("Gagal mengupload attachment portfolio")
        return
    }
}