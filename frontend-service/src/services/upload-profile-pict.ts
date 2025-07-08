import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { getSession } from "@/utils/session";
import { toast } from "sonner";

export async function uploadProfilePict(file: File){
    try{
        toast("Mengupload foto profile")
        const formData = new FormData()
        formData.append("image", file)

        await fetchJson<unknown, FormData>(
            baseUrl("/users/upload"),
            "POST",
            {
                "Authorization": `Bearer ${getSession()}`
            },
            formData
        )
        toast("Berhasil mengupload foto profile")
    }
    catch(e){
        toast("Gagal mengupload foto profile")
        console.log(e)
    }
}