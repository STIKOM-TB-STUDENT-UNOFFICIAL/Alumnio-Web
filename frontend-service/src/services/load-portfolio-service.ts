import type { TPortfolio, TPortfolioResponse } from "@/types/portfolio-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadPortfolioService(token: string): Promise<TPortfolio[] | undefined> {
    try{
        const userProfile = await fetchJson<TPortfolioResponse, undefined>(
            baseUrl("/portfolio"),
            "GET",
            {
                "Authorization": `Bearer ${token}`
            }
        )
        
        return userProfile.data
    }
    catch{
        toast("Gagal memuat informasi profile")
        return
    }
}