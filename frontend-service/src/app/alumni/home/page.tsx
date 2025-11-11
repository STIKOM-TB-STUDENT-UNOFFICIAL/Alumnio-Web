import JobCard from "@/libs/components/molecules/job-card";
import { JobSearch } from "@/libs/components/molecules/job-search";
import ProfilesCard from "@/libs/components/organism/profiles-card";
import { userProfileContext } from "@/libs/context/user-profile-context";
import { loadJobOpportunityService } from "@/services/load-job-opportunity-service";
import { loadProfileService } from "@/services/load-profile-service";
import type { JobType } from "@/types/job-types";
import type { TUserProfile } from "@/types/user-profile-types";
import { getSession } from "@/utils/session";
import { useEffect, useState, type ReactNode } from "react";

export default function Index(): ReactNode {
    const [ profile, setProfile ] = useState<TUserProfile>({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
        linkedinUrl: "",
        profilePict: ""
    })
    const [ job, setJob ] = useState<JobType[]>([])
    const [ q, setQ ] = useState<string>("")

    async function loadJob(){
        const jobOpportunity = await loadJobOpportunityService(getSession() as string, q)
        if(jobOpportunity){
            setJob(jobOpportunity)
        }
    }

    useEffect(() => {
        const userProfile = loadProfileService(getSession() as string)
        userProfile.then((v) => {
            setProfile({
                ...(v as TUserProfile)
            })
        })
        loadJob()
    }, [])

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            <userProfileContext.Provider value={profile}>
                <ProfilesCard />
            </userProfileContext.Provider>
            <h6 className="text-md md:text-xl font-bold">Jelajahi tawaran karir dari mitra STIKOM Tunas Bangsa</h6>
            <JobSearch q={q} setQ={setQ} btnAction={loadJob}/>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-x-5">
                {job.map((v) => (
                    <JobCard job={v} />
                ))}
            </div>
        </div>
    )
}
