import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import image from "@/assets/default-user.png"
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import { CarouselShow } from "@/libs/components/molecules/carousel-show";
import type { TPortfolioUserResponse } from "@/types/portfolio-types";
import { loadPortfolioByUserService } from "@/services/load-portfolio-by-user-service";
import { getSession } from "@/utils/session";
import { decodeBase64 } from "@/utils/base-64";
import { baseUrl } from "@/utils/base-url";


export default function Index(): ReactNode {
    const [searchParams] = useSearchParams()
    const [data, setData] = useState<Omit<TPortfolioUserResponse, "success" | "meta">["data"] | null>(null)

    async function load(){
        const dt = await loadPortfolioByUserService(
            getSession() as string, 
            !isNaN(parseInt(
                decodeBase64(searchParams.get("id") ?? "")
            )) ? parseInt(
                decodeBase64(searchParams.get("id") ?? "")
            ) : -1
        )

        if(dt){
            setData(dt)
        }
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full py-10">
            <div className="grid w-full bg-white dark:bg-clr-surface-a10-dark border dark:border-clr-surface-a10-dark 
                border-blue-50 rounded-lg overflow-hidden shadow-sm
                px-10 py-10 gap-10 lg:grid-cols-3"
            >
                <img
                    src={
                            data?.user.UserInformation.profilePict ? 
                            data?.user.UserInformation.profilePict != "" ? 
                            baseUrl(`/uploads/images/${data?.user.UserInformation.profilePict}`)  : 
                            image : 
                            image
                        } 
                    alt={'Profile Images'}
                    className="rounded-full w-[200px] h-[200px] object-cover"
                />
                <div className="block">
                    <h3 className="text-4xl font-bold text-transparent bg-gradient-to-r from-blue-500
                                        to-blue-700 dark:from-blue-50 dark:to-blue-300 bg-clip-text">{data?.user?.UserInformation.fullname} ({data?.user.username})</h3>
                    <h6 className="text-lg font-medium">
                        {data?.user.WorkHistory[0] ? `${data?.user.WorkHistory[0].title} di ${data?.user.WorkHistory[0].company}` : "Belum Pernah Bekerja"}
                    </h6>
                    <h5 className="my-4 text-md w-full">
                        {data?.user.UserInformation.bio}
                    </h5>
                    <div className="grid grid-flow-row-dense lg:grid-cols-2 gap-y-4 gap-x-16 text-sm">
                        <div className="grid grid-cols-[auto,1fr] items-start gap-2">
                            <AiOutlineMail className="mt-1" />
                            <span>{data?.user.UserInformation.email}</span>
                        </div>
                        <div className="grid grid-cols-[auto,1fr] items-start gap-2">
                            <AiOutlinePhone className="mt-1" />
                            <span>{data?.user.UserInformation.phone}</span>
                        </div>
                        <div className="grid grid-cols-[auto,1fr] items-start gap-2 col-span-1">
                            <FaMapMarkerAlt className="mt-1" />
                            <span>
                              {data?.user.UserInformation.address}
                            </span>
                        </div>
                        <div className="grid grid-cols-[auto,1fr] items-start gap-2">
                            <FaGraduationCap className="mt-1" />
                            <span>{data?.user.UserInformation.major.majorName} • Lulusan {data?.user.UserInformation.graduateOf}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col w-full lg:w-md">
                    <h3>{data?.portfolio.length}</h3>
                    <h5>Portfolio</h5>
                </div>
            </div>
            <h3 className="my-5 text-3xl font-semibold">🌟 Portfolio</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-2">
                {data?.portfolio?.map((v) => (
                    <div className="w-full bg-white dark:bg-clr-surface-a10-dark border dark:border-clr-surface-a10-dark 
                            border-blue-50 rounded-lg shadow-sm">
                        <CarouselShow attachments={v.PortfolioAttachment} />
                        <div className="my-2 px-10 mb-10">
                            <h4 className="text-xl font-semibold">{v.title}</h4>
                            <h4 className="text-sm">{v.description}</h4>
                            {v.demoUrl != "" ? (
                                <div className="flex my-2">
                                    <a 
                                        href={v.demoUrl} 
                                        className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                                  dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                                                    text-sm"
                                        >
                                            Link
                                        </a>
                                </div>
                            ) : (<></>)}
                        </div>
                    </div>
                ))}
            </div>
            {data?.portfolio.length == 0 ? (
                <h4 className="text-center">Tidak ada data</h4>
            ) : (<></>)}
        </div>
    )
}