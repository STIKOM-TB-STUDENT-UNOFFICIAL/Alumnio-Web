import { getWorkByUserId } from "@/repositories/work-repository.ts";

export async function getWorkHistoriesService(userId: number){
    const workHistories = await getWorkByUserId(userId)
    
    const modifiedWorkHistories: (Omit<((typeof workHistories)[number]), "userId"> & {
        status: "NEW" | "MODIFIED" | "DELETED" | "UNMODIFIED"
    })[] = workHistories.map(({
        userId,
        ...rest
    }) => {
        return {
            ...rest,
            status: "UNMODIFIED"
        }
    })

    return modifiedWorkHistories
}