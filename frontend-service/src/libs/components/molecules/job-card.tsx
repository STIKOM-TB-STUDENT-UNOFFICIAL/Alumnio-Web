import type { JobType } from "@/types/job-types";
import type { ReactNode } from "react";
import profilepict from "@/assets/default-user.png"
import { PiBuildingOffice } from "react-icons/pi";
import { MdOutlineAccessTime, MdOutlineEdit, MdOutlineLocationOn, MdPhone } from "react-icons/md";
import { CiDollar, CiMail } from "react-icons/ci";
import Button from "../atoms/button";
import { FaRegTrashAlt } from "react-icons/fa";

export default function JobCard(
    {
        job,
        mode = "ALUMNI",
        setShowEdit,
        setUpdateJob,
        setShowDelete,
        setSelectedIdx,
    }: {
        job?: JobType,
        setSelectedIdx?: React.Dispatch<React.SetStateAction<number>>,
        setShowEdit?: React.Dispatch<React.SetStateAction<boolean>>,
        setShowDelete?: React.Dispatch<React.SetStateAction<boolean>>,
        setUpdateJob?: React.Dispatch<React.SetStateAction<JobType>>,
        mode?: "ADMINISTRATOR" | "ALUMNI"
    }
): ReactNode{
    return (
        <div className="my-5 w-full border dark:border-[#1c1c3f] border-[#E5E7EB]
                        rounded-lg overflow-hidden p-5 gap-2 items-start dark:bg-clr-surface-a10-dark bg-white shadow-sm">
            <div className="grid grid-cols-[auto_1fr] gap-5 items-start">
                <img
                    src={profilepict}
                    alt="Company Logo"
                    className="w-[25px] h-[25px] md:w-[50px] md:h-[50px] rounded-full object-cover mx-auto"
                />
                <div className="block">
                    <h3 className="font-bold text-lg text-[#2563EB]">{job?.title}</h3>
                    <div className="flex items-center gap-2">
                        <PiBuildingOffice />
                        <h5 className="text-sm">{job?.company}</h5>
                    </div>
                    <div className="flex justify-between mt-5">
                        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                            <MdOutlineLocationOn />
                            <h5 className="text-sm">{job?.location}</h5>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                            <MdOutlineAccessTime />
                            <h5 className="text-sm">{new Date(job?.postedDate as string).toLocaleDateString()}</h5>
                        </div>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                        <CiDollar />
                        <h5 className="text-sm">Rp. {parseInt(job?.salary as string).toLocaleString()}</h5>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                        <CiMail />
                        <h5 className="text-sm">{job?.mailContact}</h5>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                        <MdPhone />
                        <h5 className="text-sm">{job?.phoneContact}</h5>
                    </div>
                    <div className="mt-5">
                        <h5 className="text-md" dangerouslySetInnerHTML={{ __html: (job as JobType).description.replace(/\n/g, "<br/>") }} />
                    </div>
                </div>
            </div>
            { mode != "ALUMNI" ? (
                <div className="flex justify-end mt-5 gap-2">
                    <Button 
                        btntype="danger"
                        onClick={() => {
                            if(setSelectedIdx && setShowDelete){
                                setSelectedIdx(job?.id || -1)
                                setShowDelete(true)
                            }
                        }}
                    >
                        <FaRegTrashAlt />
                    </Button>
                    <Button 
                        btntype="primary"
                        onClick={() => {
                            if(setUpdateJob && setShowEdit){
                                setUpdateJob(job as JobType)
                                setShowEdit(true)
                            }
                        }}
                    >
                        <MdOutlineEdit />
                    </Button>
                </div>
            ) : (<></>) }
        </div>
    )
}