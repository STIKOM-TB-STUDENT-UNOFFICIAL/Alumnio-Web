import { type ReactNode } from "react";
import { Input } from "../atoms/input";
import Button from "../atoms/button";

export function SurveyPage(): ReactNode {
    return (
    <>
        <div className="w-full bg-white dark:bg-[#1e293b] text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <h4 className="text-2xl font-semibold">Survey Pengguna Lulusan</h4>
            <h6 className="text-sm">Berikan penilaian tentang anda oleh perusahaan anda</h6>
            <div className="w-full bg-blue-50 dark:bg-[#232325] p-3 my-3 rounded-sm flex flex-col sm:flex-row gap-5">
                <Input 
                    type="text"
                    className="w-full"
                    label="Link survey pengguna lulusan"
                    disabled
                />
                <Button>Salin</Button>
            </div>
        </div>
        <div className="w-full bg-white dark:bg-[#1e293b] text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <h4 className="text-2xl font-semibold">Survey Alumni</h4>
            <h6 className="text-sm">Berikan penilaian anda tentang kampus STIKOM Tunas Bangsa</h6>
        </div>
    </>
    )
}