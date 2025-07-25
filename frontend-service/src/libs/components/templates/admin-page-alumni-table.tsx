import { Input } from "@/libs/components/atoms/input";
import { loadUsersService } from "@/services/load-users-service";
import type { TUserInformation } from "@/types/user-profile-types";
import { getSession } from "@/utils/session";
import { useEffect, useState } from "react";
import { AiOutlinePrinter, AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";
import { Modals } from "../molecules/modals";
import { PrintForm } from "../organism/print-form";

export function AdminPageAlumniTable(){
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
                    <h3 className="text-3xl font-bold">Tabel Alumni</h3>
                    <h6 className="text-sm font-medium">Lihat tabel alumni</h6>
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
            <div className="overflow-x-auto text-xs rounded-2xl">
                <table className="border-collapse border mt-5 w-[200rem]">
                    <thead className="bg-blue-50 dark:bg-[#232325] uppercase">
                        <tr>
                            <th className="border px-3 py-1">No</th>
                            <th className="border px-3 py-1">NIM</th>
                            <th className="border px-2 py-1 w-sm">Nama</th>
                            <th className="border px-2 py-1">Jenis Kelamin</th>
                            <th className="border px-2 py-1">Jurusan</th>
                            <th className="border px-2 py-1">Email</th>
                            <th className="border px-2 py-1">Nomor HP</th>
                            <th className="border px-2 py-1 w-lg">Alamat</th>
                            <th className="border px-2 py-1">Tahun Lulus</th>
                            <th className="border px-2 py-1">Tahun Pertama Bekerja</th>
                            <th className="border px-2 py-1 w-lg">Pekerjaan Pertama</th>
                            <th className="border px-2 py-1 w-lg">Pekerjaan Terakhir</th>
                        </tr>
                    </thead>
                    <tbody>
                        { profiles?.map((v, i) => (
                            <tr key={i}>
                                <td className="border px-3 py-1 text-center">{i + 1}</td>
                                <td className="border px-3 py-1 text-center">{v.username}</td>
                                <td className="border px-2 py-1 text-center">{v.UserInformation.fullname}</td>
                                <td className="border px-2 py-1 text-center">{v.UserInformation.gender === "Male" ? "Laki-laki" : "Perempuan"}</td>
                                <td className="border px-2 py-1 text-center">{v.UserInformation.major.majorName}</td>
                                <td className="border px-2 py-1 text-center">{v.UserInformation.email}</td>
                                <td className="border px-2 py-1 text-center">{v.UserInformation.phone}</td>
                                <td className="border px-2 py-1 text-center">{v.UserInformation.address}</td>
                                <td className="border px-2 py-1 text-center">{v.UserInformation.graduateOf}</td>
                                <td className="border px-2 py-1 text-center">
                                    {v.WorkHistory[0]?.startDate.split("-")[0] ?? "Belum Pernah Bekerja"}
                                </td>
                                <td className="border px-2 py-1 text-center">
                                    {v.WorkHistory[0] ? `${v.WorkHistory[0].title} di ${v.WorkHistory[0].company}` : "Belum Pernah Bekerja"}
                                </td>
                                <td className="border px-2 py-1 text-center">
                                    {v.WorkHistory[v.WorkHistory.length - 1] ? `${v.WorkHistory[v.WorkHistory.length - 1].title} di ${v.WorkHistory[0].company}` : "Belum Pernah Bekerja"}
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </>
    )
}