import type { JobType } from "@/types/job-types";
import type { ReactNode } from "react";
import profilepict from "@/assets/default-user.png"
import { PiBuildingOffice } from "react-icons/pi";
import { MdOutlineAccessTime, MdOutlineLocationOn, MdPhone } from "react-icons/md";
import { CiDollar, CiMail } from "react-icons/ci";

export default function JobCard(
    {
        job
    }: {
        job?: JobType
    }
): ReactNode{
    return (
        <div className="flex my-5 w-full border dark:border-[#1c1c3f] border-[#E5E7EB]
                        rounded-lg overflow-hidden p-5 gap-2 items-start dark:bg-slate-800 bg-white shadow-sm">
            <div className="grid grid-cols-[auto_1fr] gap-5 items-start">
                <img
                    src={profilepict}
                    alt="Company Logo"
                    className="w-[25px] h-[25px] md:w-[50px] md:h-[50px] rounded-full object-cover mx-auto"
                />
                <div className="block">
                    <h3 className="font-bold text-lg text-[#2563EB]">Senior Tukang Ngetik</h3>
                    <div className="flex items-center gap-2">
                        <PiBuildingOffice />
                        <h5 className="text-sm">PT. Kampus Kikir</h5>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-row-dense mt-5 text-gray-500">
                        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                            <MdOutlineLocationOn />
                            <h5 className="text-sm">Siantar</h5>
                        </div>
                        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                            <MdOutlineAccessTime />
                            <h5 className="text-sm">2hr yang lalu</h5>
                        </div>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                        <CiDollar />
                        <h5 className="text-sm">Rp. 2.000.000</h5>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                        <CiMail />
                        <h5 className="text-sm">kampuskikir@gmail.com</h5>
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-1">
                        <MdPhone />
                        <h5 className="text-sm">0888 7777 6666</h5>
                    </div>
                    <div className="mt-5">
                        <h5 className="text-md">
                            PT. Kampus Kikir sedang mencari Staff Administrasi & Data yang teliti, bertanggung jawab, dan memiliki kemampuan mengelola dokumen serta data dengan baik. Kandidat terpilih akan bekerja sama dengan tim untuk mendukung kelancaran operasional harian perusahaan.
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}