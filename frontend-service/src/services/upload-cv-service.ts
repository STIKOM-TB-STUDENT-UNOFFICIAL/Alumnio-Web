import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { getSession } from "@/utils/session";
import { toast } from "sonner";

export async function uploadCvService(file: File){
    try{
        toast("Mengupload cv")
        const formData = new FormData()
        formData.append("cvFile", file)

        await fetchJson<unknown, FormData>(
            baseUrl("/cv"),
            "POST",
            {
                "Authorization": `Bearer ${getSession()}`
            },
            formData
        )
        toast("Berhasil mengupload cv")
    }
    catch(e){
        toast("Gagal mengupload cv")
        console.log(e)
    }
}