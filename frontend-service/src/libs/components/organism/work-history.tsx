import { useEffect, useState, type ReactNode } from "react";
import { AiFillSave, AiOutlineFileAdd } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { InputWithError } from "../molecules/input-with-error";
import type { TWork } from "@/types/work-types";
import { getTodayDateString } from "@/utils/get-today";
import { toast } from "sonner";
import { loadWorkHistoriesService } from "@/services/load-work-histories-service";
import { getSession } from "@/utils/session";

export function WorkHistory(): ReactNode {
    const [history, setHistory] = useState<TWork[]>([]);

    useEffect(() => {
        const userProfile = loadWorkHistoriesService(getSession() as string)
        userProfile.then((v) => {
            setHistory(v as TWork[])
            console.log(history)
        })
    }, [])

    return (
        <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
            <div className="flex justify-between items-center gap-2">
                <div className="block">
                    <h4 className="text-2xl font-semibold">Riwayat Pekerjaan</h4>
                    <h6 className="text-sm">Sesuaikan pengalaman professional anda</h6>
                </div>
                <button
                    className="dark:bg-blue-900 bg-blue-400 px-4 py-2 rounded-lg cursor-pointer my-5 flex justify-center items-center gap-3"
                    onClick={() => {
                        const hstr = [...history]
                        hstr.unshift({
                            id: -1,
                            title: "",
                            company: "",
                            startDate: getTodayDateString(),
                            endDate: getTodayDateString(),
                            status: "NEW"
                        })
                        setHistory(hstr)
                        toast("Menambah pengalaman pekerjaan")
                    }}
                >
                    <AiOutlineFileAdd />
                    <h3 className="hidden lg:block">Tambah Pengalaman</h3>
                </button>
            </div>
            { history.map((v, i) => (
                <div className={`w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5 ${v.status == "DELETED" ? "hidden" : ""}`} key={i}>
                    <div className="flex justify-between">
                        <h5 className="border dark:border-[#232325] border-blue-50 px-2 py-1 rounded-lg text-sm">
                            Pengalaman #{i + 1}
                        </h5>
                        <button 
                            className="cursor-pointer"
                            onClick={() => {
                                const hstr = [...history]
                                if(hstr[i].status != "NEW"){
                                    hstr[i] = {
                                        ...hstr[i],
                                        status: "DELETED"
                                    }
                                }
                                else{
                                    hstr.splice(i, 1)
                                }
                                setHistory(hstr)
                            }}
                        >
                            <IoTrashOutline />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-5 mt-5">
                        <InputWithError 
                            type={"text"} 
                            label="Company"
                            value={v.company}
                            onChange={(e) => {
                                const hstr = [...history]
                                hstr[i] = {
                                    ...hstr[i],
                                    company: e.target.value
                                }
                                setHistory(hstr)
                            }}
                        />
                        <InputWithError 
                            type={"text"} 
                            label="Role"
                            value={v.title}
                            onChange={(e) => {
                                const hstr = [...history]
                                hstr[i] = {
                                    ...hstr[i],
                                    title: e.target.value
                                }
                                setHistory(hstr)
                            }}
                        />
                        <InputWithError 
                            type={"date"} 
                            label="Start Date"
                            value={v.startDate}
                            onChange={(e) => {
                                const hstr = [...history]
                                hstr[i] = {
                                    ...hstr[i],
                                    startDate: e.target.value
                                }
                                setHistory(hstr)
                            }}
                        />
                        <div className="block">
                            <InputWithError 
                                label="End Date" 
                                type={"date"} 
                                value={v.endDate ?? ""} 
                                disabled={v.endDate == null ? true : false}
                                onChange={(e) => {
                                    const hstr = [...history]
                                    hstr[i] = {
                                        ...hstr[i],
                                        endDate: e.target.value
                                    }
                                    setHistory(hstr)
                                }}
                            />
                            <div className="flex items-center gap-1">
                                <input 
                                    type="checkbox"
                                    id={`pengalaman_${i}`}
                                    checked={v.endDate == null}
                                    onClick={() => {
                                        const hstr = [...history]
                                        if(v.endDate == null){
                                            hstr[i] = {
                                                ...hstr[i],
                                                endDate: getTodayDateString()
                                            }
                                        }
                                        else{
                                            hstr[i] = {
                                                ...hstr[i],
                                                endDate: null
                                            }
                                        }
                                        setHistory(hstr)
                                    }}
                                    onChange={() => {
                                        return
                                    }}
                                />
                                <label htmlFor={`pengalaman_${i}`}>Saat Ini</label>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <button
                className="dark:bg-blue-900 w-full bg-blue-400 px-4 py-1 rounded-lg cursor-pointer my-5 flex justify-center items-center gap-3"
                onClick={() => {
                    console.log(history)
                }}
            >
                <AiFillSave />
                Simpan
            </button>
        </div>
    )
}