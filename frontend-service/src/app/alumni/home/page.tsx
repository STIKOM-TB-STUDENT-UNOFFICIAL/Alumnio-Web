import JobCard from "@/libs/components/molecules/job-card";
import { JobSearch } from "@/libs/components/molecules/job-search";
import ProfilesCard from "@/libs/components/organism/profiles-card";
import { userProfileContext } from "@/libs/context/user-profile-context";
import { loadProfileService } from "@/services/load-profile-service";
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

    useEffect(() => {
        const userProfile = loadProfileService(getSession() as string)
        userProfile.then((v) => {
            setProfile({
                ...(v as TUserProfile)
            })
        })
    }, [])

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            <userProfileContext.Provider value={profile}>
                <ProfilesCard />
            </userProfileContext.Provider>
            <h6 className="text-md md:text-xl font-bold">Jelajahi tawaran karir dari jaringan alumni</h6>
            <JobSearch />
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-x-5">
                <JobCard />
                <JobCard />
                <JobCard />
                <JobCard />
            </div>
        </div>
    )
}
