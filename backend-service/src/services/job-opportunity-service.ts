import { createJobOpportunity, deleteJobOpportunity, getJobOpportunity, patchJobOpportunity } from "@/repositories/job-opportunity-repository.ts";
import type { JobType } from "@/types/job-type.ts";

export async function getJobOpportunityService(q: string){
    return await getJobOpportunity(q)
}

export async function postJobOpportunityService(
    job: Omit<JobType, "id" | "companyLogo" | "postedDate">
){
    return await createJobOpportunity(job)
}

export async function patchJobOpportunityService(
    job: Omit<JobType, "companyLogo" | "postedDate">
){
    return await patchJobOpportunity(job)
}

export async function deleteJobOpportunityService(id: number){
    return await deleteJobOpportunity(id)
}