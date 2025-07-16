import type { TPortfolio } from "@/types/portfolio-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function savePortfolioService(token: string, data: Omit<TPortfolio, "PortfolioAttachment" | "PortfolioStack">): Promise<[] | undefined> {
    try{
        await fetchJson<unknown, Omit<TPortfolio, "PortfolioAttachment" | "PortfolioStack"> & { PortfolioAttachment: undefined, PortfolioStack: undefined}>(
            baseUrl("/portfolio"),
            "PATCH",
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            {
                ...data,
                PortfolioAttachment: undefined,
                PortfolioStack: undefined
            }
        )
        toast("Berhasil Menyimpan Portfolio")
    }
    catch{
        toast("Gagal Menyimpan Portfolio")
        return
    }
}