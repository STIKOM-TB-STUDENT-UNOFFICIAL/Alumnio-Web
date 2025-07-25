import { Input } from "@/libs/components/atoms/input";
import { AlumniCard } from "@/libs/components/organism/alumni-card";
import { loadUsersService } from "@/services/load-users-service";
import type { TUserInformation } from "@/types/user-profile-types";
import { getSession } from "@/utils/session";
import { useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import { Modals } from "../molecules/modals";
import { PrintForm } from "../organism/print-form";

export function AdminPageAlumniView(){
    const [profiles, setProfiles] = useState<TUserInformation[]>([] as TUserInformation[])
    const [q, setQ] = useState("")
    const [printPrompt, setPrintPrompt] = useState(false)

    async function loadUserProfile(query: string) {
        const userProfile = await loadUsersService(getSession() as string, query)
        setProfiles(userProfile as TUserInformation[])
    }

    useEffect(() => {
        loadUserProfile(q)
    }, [q])
    
    return (
        <>
            <Modals 
                show={printPrompt} 
                control={setPrintPrompt}
                title="Print Prompt"
            >
                <PrintForm />
            </Modals>
            <div className="flex justify-between mt-10">
                <div className="block">
                    <h3 className="text-3xl font-bold">Daftar Alumni</h3>
                    <h6 className="text-sm font-medium">Lihat profil alumni</h6>
                </div>
                <div className="flex items-center">
                    <a href="/admin/add-alumni" 
                        className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                    dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                                    text-sm"
                    >
                        <AiOutlineUserAdd />
                        Tambah Alumni
                    </a>
                </div>
            </div>
            <Input
                type="text"
                Icon={AiOutlineSearch}
                className="mt-5 lg:*:w-[400px]"
                placeholder="Cari alumni berdasarkan nama dan nim"
                onChange={(e) => {
                    setQ(e.target.value)
                }}
                value={q}
            />
            <button 
                className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                          dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                            text-sm cursor-pointer mt-5"
                onClick={() => {
                    setPrintPrompt(true)
                }}
                
            >
                <AiOutlinePrinter />
                Print
            </button>
            {profiles.map((v, i) => (
                <AlumniCard profile={v} key={i} />
            ))}
        </>
    )
}