import type { TUserInformation } from "@/types/user-profile-types";
import { getSession } from "@/utils/session";
import { useEffect, useState } from "react";
import {  AiOutlineUserAdd } from "react-icons/ai";
import { Modals } from "../molecules/modals";
import { NewOrEditAdmin } from "../organism/new-or-edit-admin";
import { loadAdministratorService } from "@/services/load-administrator-service";
import { deleteAdministratorService } from "@/services/delete-admin-service";

export function AdminPageAdministratorTable(){
    const [profiles, setProfiles] = useState<TUserInformation[]>([] as TUserInformation[])
    const [newPrompt, setNewPrompt] = useState(false)
    const [patchPrompt, setPatchPrompt] = useState(false)
    const [patchOption, setPatchOption] = useState<{
        username: string,
        userId: number
    } | null>(null)

    async function loadAdministrator() {
        const userProfile = await loadAdministratorService(getSession() as string)
        setNewPrompt(false)
        setPatchPrompt(false)
        setProfiles(userProfile as TUserInformation[])
    }

    useEffect(() => {
        loadAdministrator()
    }, [])

    useEffect(() => {
        if(patchOption != null){
            setPatchPrompt(true)
        }
    }, [patchOption])
    
    return (
        <>
            <Modals 
                show={newPrompt} 
                control={setNewPrompt}
                title="New Administrator"
            >
                <NewOrEditAdmin 
                    action="NEW"
                    callback={loadAdministrator}
                />
            </Modals>
            <Modals 
                show={patchPrompt} 
                control={setPatchPrompt}
                title="Update Administrator"
            >
                <NewOrEditAdmin 
                    action="CHANGE"
                    callback={loadAdministrator}
                    userId={patchOption?.userId}
                    userName={patchOption?.username}
                />
            </Modals>
            <div className="flex justify-between">
                <div className="block">
                    <h3 className="text-3xl font-bold">Tabel Administrator</h3>
                    <h6 className="text-sm font-medium">Lihat daftar administrator yang mengelola alumnio</h6>
                </div>
                <div className="flex items-center">
                    <button 
                        className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                    dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                                    text-sm cursor-pointer"
                        onClick={() => setNewPrompt(true)}
                    >
                        <AiOutlineUserAdd />
                        Tambah Admin
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto text-xs">
                <table className="border-collapse border mt-5 w-full">
                    <thead className="bg-blue-50 dark:bg-slate-700 uppercase">
                        <tr>
                            <th className="border px-3 py-1">No</th>
                            <th className="border px-3 py-1">Username</th>
                            <th className="border px-2 py-1 w-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { profiles?.map((v, i) => (
                            <tr key={i}>
                                <td className="border px-3 py-1 text-center">{i + 1}</td>
                                <td className="border px-3 py-1 text-center">{v.username}</td>
                                {v.username != "admin" ? (
                                    <td className="border px-3 py-1 text-center flex flex-col lg:flex-row gap-2">
                                        
                                    <button 
                                        className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                                    dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                                                    text-sm cursor-pointer"
                                        onClick={() => {
                                            setPatchOption({
                                                userId: v.id as number,
                                                username: v.username
                                            })
                                        }}
                                    >
                                        Update
                                    </button>
                                    <button 
                                        className="bg-red-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                                    dark:bg-red-900 text-[#f7f7f8] flex items-center gap-2
                                                    text-sm cursor-pointer"
                                        onClick={async () => {
                                            const confirmation = confirm(`Yakin akan menghapus ${v.username} ?`)
                                            if(confirmation){
                                                await deleteAdministratorService(getSession() as string, { userId: v.id as number })
                                                await loadAdministrator()
                                            }
                                        }}
                                    >
                                        Delete
                                    </button>
                                </td>
                                ) : (<></>)}
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}