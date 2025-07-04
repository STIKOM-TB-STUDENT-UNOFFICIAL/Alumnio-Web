import { useState, type ReactNode } from "react";
import { AiFillSave, AiOutlineFileAdd } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { InputWithError } from "../molecules/input-with-error";

export function WorkHistory(): ReactNode {
    const [pengalaman] = useState([
        {
            title: "Software Engineer",
            company: "Google",
            startDate: "2022-06-01",
            endDate: "null"
        },
        {
            title: "Frontend Developer",
            company: "Meta",
            startDate: "2020-01-15",
            endDate: "2022-05-30"
        },
        {
            title: "Backend Developer",
            company: "Amazon",
            startDate: "2018-08-01",
            endDate: "2019-12-20"
        },
        {
            title: "Intern Developer",
            company: "Tokopedia",
            startDate: "2017-06-10",
            endDate: "2017-12-01"
        }
    ]);


    return (
        <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
            <div className="flex justify-between items-center">
                <div className="block">
                    <h4 className="text-2xl font-semibold">Riwayat Pekerjaan</h4>
                    <h6 className="text-sm">Sesuaikan pengalaman professional anda</h6>
                </div>
                <button className="dark:bg-blue-900 bg-blue-400 px-4 py-1 rounded-lg cursor-pointer my-5 flex justify-center items-center gap-3">
                    <AiOutlineFileAdd />
                    Tambah Pengalaman
                </button>
            </div>
            { pengalaman.map((v, i) => (
                <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
                    <div className="flex justify-between">
                        <h5 className="border dark:border-[#232325] border-blue-50 px-2 py-1 rounded-lg text-sm">
                            Pengalaman #{i + 1}
                        </h5>
                        <button className="cursor-pointer">
                            <IoTrashOutline />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-5 mt-5">
                            <div className="block">
                                <h6 className="mb-2">Company</h6>
                                <InputWithError type={"text"} value={v.company} />
                            </div>
                            <div className="block">
                                <h6 className="mb-2">Role</h6>
                                <InputWithError type={"text"} value={v.title} />
                            </div>
                            <div className="block">
                                <h6 className="mb-2">Start date</h6>
                                <InputWithError type={"date"} value={v.startDate}/>
                            </div>
                            <div className="block">
                                <h6 className="mb-2">End date</h6>
                                <InputWithError type={"date"} value={v.endDate}/>
                                <div className="flex items-center gap-1">
                                    <input 
                                        type="checkbox"
                                        id={`pengalaman_${i}`}
                                        checked={v.endDate == "null"}
                                    />
                                    <label htmlFor={`pengalaman_${i}`}>Saat Ini</label>
                                </div>
                            </div>
                        </div>
                </div>
            ))}
            <button className="dark:bg-blue-900 w-full bg-blue-400 px-4 py-1 rounded-lg cursor-pointer my-5 flex justify-center items-center gap-3">
                <AiFillSave />
                Simpan
            </button>
        </div>
    )
}