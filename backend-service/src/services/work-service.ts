import { deleteWork, getWorkByUserId, postWork, updateWork } from "@/repositories/work-repository.ts";
import type { TWork } from "@/types/work-type.ts";

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

export async function postWorkHistoriesService(userId: number, workData: TWork[]){
    const modifiedWorkData = workData
        .filter((v) => v.status == "MODIFIED")
        .map(({status, ...rest}) => {
            return {
                ...rest,
                startDate: (new Date(rest.startDate)).toISOString(),
                endDate: rest.endDate != null ? (new Date(rest.endDate)).toISOString() : null
            }
        })
    const newWorkData = workData
        .filter((v) => v.status == "NEW")
        .map(({status, id, ...rest}) => {
            return {
                ...rest,
                userId,
                startDate: (new Date(rest.startDate)).toISOString(),
                endDate: rest.endDate != null ? (new Date(rest.endDate)).toISOString() : null
            }
        })
    const deletedWorkData = workData
        .filter((v) => v.status == "DELETED")
        .map((v) => v.id)
    
    await postWork(newWorkData)
    await deleteWork(deletedWorkData)

    for(let i = 0; i < modifiedWorkData.length; i++){
        await updateWork(modifiedWorkData[i].id, modifiedWorkData[i])
    }

    return
}