import { Input } from "@/libs/components/atoms/input";
import type { ReactNode } from "react";
import { AiOutlineSearch, AiOutlineUserAdd } from "react-icons/ai";

export default function Index(): ReactNode {
    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
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
            />
        </div>
    )
}