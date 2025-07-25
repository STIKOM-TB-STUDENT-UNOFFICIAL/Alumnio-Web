import type { TPortfolioUserResponse } from "@/types/portfolio-types";
import { baseUrl } from "@/utils/base-url";
import { fetchJson } from "@/utils/fetch-json";
import { toast } from "sonner";

export async function loadPortfolioByUserService(token: string, userId: number): Promise<Omit<TPortfolioUserResponse, "success" | "meta">["data"] | undefined> {
    try{
        const userProfile = await fetchJson<TPortfolioUserResponse, undefined>(
            baseUrl(`/portfolio/user?id=${userId}`),
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