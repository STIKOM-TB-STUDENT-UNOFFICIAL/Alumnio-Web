import { useState, type ReactNode } from "react";
import profilepict from "@/assets/481932188_17898877434116514_6989620279172715534_n.webp"
import { AiFillLinkedin, AiOutlineFileText, AiOutlineMail, AiOutlinePhone, AiOutlinePicture } from "react-icons/ai";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import type { TUserInformation } from "@/types/user-profile-types";
import { getDateFormat } from "@/utils/get-date-format";
import { baseUrl } from "@/utils/base-url";
import { encodeBase64 } from "@/utils/base-64";

export function AlumniCard({
    profile
}:
{
    profile: TUserInformation
}): ReactNode{
    const [hidden, setHidden] = useState(true)

    return (
        <div 
            className="flex flex-col my-5 w-full border dark:border-[#232325] border-blue-50 
                        rounded-lg overflow-hidden shadow-xs"
        >
            <div className="flex flex-col lg:flex-row lg:justify-between gap-5 lg:gap-2 p-10    
                        lg:items-center w-full hover:dark:bg-[#313139] hover:bg-[#ebf3ff]
                        cursor-pointer transition duration-200"
                onClick={() => setHidden(!hidden)}
            >
                <div className="grid grid-flow-row lg:grid-flow-col gap-5">
                    <img 
                        src={
                            profile.UserInformation.profilePict ? 
                            profile.UserInformation.profilePict != "" ? 
                            baseUrl(`/uploads/images/${profile.UserInformation.profilePict}`)  : 
                            profilepict : 
                            profilepict
                        }
                        alt={"Profile Pict"}
                        className="w-[100px] h-[100px] object-cover rounded-full"
                    />
                    <div className="block">
                        <h2 className="text-xl font-bold">{profile.UserInformation.fullname} ({profile.username})</h2>
                        <h2 className="text-md">{
                            profile.WorkHistory.length > 0 ? 
                            profile.WorkHistory[0].title : 
                            "Unemployed"} {
                            profile.WorkHistory[0] ? 
                            `di ${profile.WorkHistory[0].company}` : 
                            ""}</h2>
                        <div className="flex my-1 gap-2 lg:flex-row flex-col">
                            <div className="rounded-full border dark:border-[#232325] border-blue-50 px-2 py-1
                                            dark:bg-[#232325] bg-blue-50">
                                {profile.UserInformation.major.majorName}
                            </div>
                            <div className="rounded-full border dark:border-[#232325] border-blue-50 px-2 py-1">
                                {profile.UserInformation.graduateOf != "" ? profile.UserInformation.graduateOf : "Unknown"}
                            </div>
                        </div>
                        <h2 className="text-md">{profile.UserInformation.bio}</h2>
                    </div>
                </div>
                <div className="flex gap-2">
                    <a href={`/admin/portfolio?id=${encodeBase64((profile.id ?? -1).toString())}`} target="_blank" className="border dark:border-[#232325] border-blue-50 px-2 py-1 dark:bg-[#2b2b33] bg-white
                                        rounded-md flex gap-3 items-center hover:dark:bg-[#34343f] hover:bg-[#e3edfd] cursor-pointer">
                        <AiOutlinePicture />
                        Portofolio
                    </a>
                    {profile.UserInformation.curriculumVitae != "" ? (
                        <a href={baseUrl(`/uploads/documents/${profile.UserInformation.curriculumVitae}`)} target="_blank" className="border dark:border-[#232325] border-blue-50 px-2 py-1 dark:bg-[#2b2b33] bg-white
                                            rounded-md flex gap-3 items-center hover:dark:bg-[#34343f] hover:bg-[#e3edfd] cursor-pointer">
                            <AiOutlineFileText />
                            CV
                        </a>
                    ) : (<></>)}
                </div>
            </div>
            <div className={`px-10 py-5 grid grid-cols-1 lg:grid-cols-2 ${hidden ? "hidden" : ""}`}>
                <div className="block">
                    <h3 className="text-lg font-semibold flex gap-2 items-center mb-5">
                        <AiOutlineMail />
                        Contact Information
                    </h3>
                    <h3 className="text-sm flex gap-2 items-center">
                        <AiOutlineMail />
                        {profile.UserInformation.email}
                    </h3>
                    <h3 className="text-sm flex gap-2 items-center">
                        <AiOutlinePhone />  
                        {profile.UserInformation.phone}
                    </h3>
                    <h3 className="text-sm flex gap-2 items-center">
                        <FaMapMarkerAlt />  
                        {profile.UserInformation.address ? profile.UserInformation.address : "Unknown"}
                    </h3>
                    {profile.UserInformation.linkedinUrl != "" && profile.UserInformation.linkedinUrl ? (
                        <h3 className="text-sm flex gap-2 items-center">
                            <AiFillLinkedin /> 
                            <a target="_blank" href={profile.UserInformation.linkedinUrl}>{profile.UserInformation.linkedinUrl}</a>
                        </h3>
                    ) : (<></>)}
                </div>
                <div className="flex flex-col gap-3 mt-5 lg:mt-0">
                    <h3 className="text-lg font-semibold flex gap-2 items-center mb-5">
                        <FaBriefcase />
                        Work History
                    </h3>
                    {profile.WorkHistory.map((v, i) => (
                        <div className="border-l-1 dark:border-l-blue-900 border-l-blue-400 p-3" key={i}>
                            <h3 className="font-bold text-lg">{v.title}</h3>
                            <h3 className="text-md">{v.company}</h3>
                            <h3 className="text-sm">{getDateFormat(v.startDate)} - {getDateFormat(v.endDate)}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}