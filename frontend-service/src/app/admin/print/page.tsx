import { loadUsersService } from "@/services/load-users-service";
import type { TUserInformation } from "@/types/user-profile-types";
import { getSession } from "@/utils/session";
import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export default function Index(): ReactNode {
    const [profiles, setProfiles] = useState<TUserInformation[] | null>(null)
    const [searchParams] = useSearchParams()

    const q = searchParams.get("q")
    const major = searchParams.get("major")
    const take = searchParams.get("take")

    async function loadUserProfile(query: string) {
        const userProfile = await loadUsersService(getSession() as string, query, major ? major : undefined, 0, take ? parseInt(take) : 100)
        setProfiles(userProfile as TUserInformation[])
    }
    
    useEffect(() => {
        loadUserProfile(q ? q : "")
    }, [])

    useEffect(() => {
        if(profiles){
            window.print()
            window.close()
        }
    }, [profiles])

    return (
        <div className="min-h-[100vh] w-full">
            <h3 className="text-2xl mb-2 font-semibold">Daftar Alumni</h3>
            <table className="border-collapse border w-full">
                <thead>
                    <tr>
                        <th className="border px-3 py-1">No</th>
                        <th className="border px-3 py-1">NIM</th>
                        <th className="border px-2 py-1">Nama</th>
                        <th className="border px-2 py-1">Jenis Kelamin</th>
                        <th className="border px-2 py-1">Jurusan</th>
                        <th className="border px-2 py-1">Email</th>
                        <th className="border px-2 py-1">Nomor HP</th>
                        <th className="border px-2 py-1">Alamat</th>
                        <th className="border px-2 py-1">Tahun Lulus</th>
                        <th className="border px-2 py-1">Tahun Pertama Bekerja</th>
                        <th className="border px-2 py-1">Pekerjaan Pertama</th>
                        <th className="border px-2 py-1">Pekerjaan Terakhir</th>
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
    )
}