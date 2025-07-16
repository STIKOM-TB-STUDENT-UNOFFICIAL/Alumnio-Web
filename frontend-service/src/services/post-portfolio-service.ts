import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function postPortfolio(token: string): Promise<undefined> {
    try{
        const data = {
            title: "New Portfolio",
            description: "",
            demoUrl: "",
            sourceCode: "",
        }
        await fetchJson<unknown, typeof data>(
            baseUrl("/portfolio"),
            "POST",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            data
        )
        toast("Berhasil menambah Portfolio baru")
    }
    catch{
        toast("Gagal menambah Portfolio baru")
        return
    }
}