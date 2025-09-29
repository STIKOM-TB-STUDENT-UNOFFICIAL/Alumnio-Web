import { userProfileContext } from "@/libs/context/user-profile-context"
import { baseUrl } from "@/utils/base-url"
import { useContext, useEffect } from "react"
import profilepict from "@/assets/default-user.png"
import type { TUserProfile } from "@/types/user-profile-types"

export default function ProfilesCard(){
    const profile = useContext(userProfileContext) as TUserProfile & {major: { majorName: string }, graduateOf: string}

    useEffect(() => {
        console.log(profile)
    })

    return (
        <div 
            className="flex flex-col my-5 w-full border dark:border-[#232325] border-blue-50 
                        rounded-lg overflow-hidden shadow-sm bg-clr-surface-tonal-a0-light dark:bg-slate-800"
        >
            <div className="grid md:grid-cols-[auto_1fr] md:items-center gap-5 md:gap-10 px-10 py-5   
                        items-center w-full"
            >
                <img 
                    src={
                        profile.profilePict ? 
                        profile.profilePict != "" ? 
                        baseUrl(`/uploads/images/${profile.profilePict}`)  : 
                        profilepict : 
                        profilepict
                    }
                    alt="Profile Pict"
                    className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full my-5 object-cover mx-auto"
                    style={{
                        imageRendering: "auto"
                    }}
                />
                <div className="block">
                    <h4 className="font-semibold text-md md:text-xl">{profile.fullname}</h4>
                    <h4 className="font-medium text-xs md:text-md text-[#6B7280]">{profile.major?.majorName ?? ""} ({profile.graduateOf ?? ""})</h4>
                    <div className="flex my-2">
                        <a 
                            href="/alumni/dashboard"
                            className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                    dark:bg-blue-900 text-white flex items-center gap-2
                                    text-sm"
                        >Dashboard</a>
                    </div>
                </div>
            </div>
        </div>
    )
}