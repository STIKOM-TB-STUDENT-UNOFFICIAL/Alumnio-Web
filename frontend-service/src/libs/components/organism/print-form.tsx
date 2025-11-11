import type { TMajor } from "@/types/user-profile-types";
import { CustomSelect } from "../atoms/custom-select";
import { InputWithError } from "../molecules/input-with-error";
import { useEffect, useState } from "react";
import { loadMajorService } from "@/services/load-major-service";
import { getSession } from "@/utils/session";
import Button from "../atoms/button";

export function PrintForm(){
    const [major, setMajor] = useState<TMajor[]>([])
    const [q, setQ] = useState("")
    const [take, setTake] = useState(100)
    const [majorS, setMajorS] = useState("")

    async function loadMajor(){
        const major = await loadMajorService(getSession() as string)
        if(major){
            setMajor(major)
        }
    }

    useEffect(() => {
        loadMajor()
    }, [major])

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
        }}>
            <InputWithError 
                type="text"
                label="Total"
                placeholder="100"
                className="mb-2"
                value={take}
                onChange={(e) => setTake(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}
            />
            <InputWithError 
                type="text"
                label="Keyword (Optional)"
                placeholder="Nama | Tahun Lulus"
                className="mb-2"
                value={q}
                onChange={(e) => setQ(e.target.value)}
            />
            <label>Program Studi</label>
            <CustomSelect 
                data={[
                    {
                        value: "",
                        display: "Semua"
                    },
                    ...major.map((v) => {
                        return {
                            value: v.majorName,
                            display: v.majorName
                        }
                    })
                ]}
                onChange={(e) => {
                    setMajorS(e.target.value)
                }}
            />
            <Button 
                className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                          dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                            text-sm cursor-pointer mt-5 w-full justify-center"
                onClick={() => {
                    window.open(`/admin/print?q=${q}&major=${majorS}&take=${take}`, "_blank")
                }}
            >
                Print
            </Button>
        </form>
    )
}