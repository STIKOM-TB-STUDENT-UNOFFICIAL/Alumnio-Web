import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { getSession } from "@/utils/session";
import { toast } from "sonner";

export async function uploadXLSX(file: File){
    try{
        toast("Memproses file excel (jangan menutup halaman)")
        const formData = new FormData()
        formData.append("xlsxFile", file)

        await fetchJson<unknown, FormData>(
            baseUrl("/users/create"),
            "POST",
            {
                "Authorization": `Bearer ${getSession()}`
            },
            formData
        )
        toast("Berhasil memproses file excel")
    }
    catch{
        toast("Gagal memproses file excel")
    }
}