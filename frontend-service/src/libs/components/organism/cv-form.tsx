import type { ReactNode } from "react";
import profile from "@/assets/481932188_17898877434116514_6989620279172715534_n.webp"
import { InputWithError } from "../molecules/input-with-error";

export function CVForm(): ReactNode {
    return (
        <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
            <h4 className="text-2xl font-semibold">CV Management</h4>
            <h6 className="text-sm">Upload dan download CV anda</h6>
            <div className="flex items-center">
                <img 
                    src={profile}
                    alt="Profile Pict"
                    className="w-[100px] h-[100px] object-cover rounded-full my-5"
                />
                <button className="border dark:border-[#232325] border-blue-50 p-3 rounded-lg cursor-pointer mx-4 dark:hover:bg-[#232325] hover:bg-blue-50 ">
                    Ubah Gambar
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-5">
                <div className="block">
                    <h6 className="mb-2">Full Name</h6>
                    <InputWithError type={"text"} />
                </div>
                <div className="block">
                    <h6 className="mb-2">Email</h6>
                    <InputWithError type={"text"} />
                </div>
                <div className="block">
                    <h6 className="mb-2">Phone</h6>
                    <InputWithError type={"text"} />
                </div>
                <div className="block">
                    <h6 className="mb-2">Address</h6>
                    <InputWithError type={"text"} />
                </div>
                <div className="block">
                    <h6 className="mb-2">Linkedin</h6>
                    <InputWithError type={"text"} />
                </div>
            </div>
            <h6 className="mb-2 mt-5">Bio</h6>
            <InputWithError type={"text"} />
            <button className="dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer my-5 ">
                Simpan
            </button>
        </div>
    )
}