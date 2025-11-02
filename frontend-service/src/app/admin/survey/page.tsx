import Button from "@/libs/components/atoms/button";
import { Input } from "@/libs/components/atoms/input";
import { loadSurveyService } from "@/services/load-survey-service";
import type { TAnswer, TSurvey } from "@/types/survey-types";
import { getSession } from "@/utils/session";
import { useEffect, useState, type ReactNode } from "react";

export default function Index(): ReactNode {
    const [ survey, setSurvey ] = useState<TSurvey[]>([])
    const [ isAnswering, setIsAnswering ] = useState(false)

    function load(){
        loadSurveyService(getSession() as string)
        .then((v) => {
            if(v){
                setSurvey(v.map((w) => {
                    w.Answer = w.Answer.map((x) => {
                        x.status = "NO_CHANGES"
                        return x
                    })
                    return w
                }))
                console.log(v)
            }
        })
    }

    useEffect(() => {
        load()
    }, [])
    
    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full py-10">
            <div className="w-full bg-white dark:bg-[#1e293b] 
                rounded-lg overflow-hidden shadow-sm
                px-10 py-10 gap-10"
            >
                <h3 className="text-3xl font-bold mb-5">Survey Alumni</h3>
                { survey.map((v, i) => (
                    <div className="block bg-clr-surface-tonal-a10-light dark:bg-clr-surface-tonal-a10-dark p-4 rounded-md shadow-sm" key={i}>
                        <h6 className="font-semibold">Pertanyaan ke {i + 1}</h6>
                        <Input type="text" value={v.questions} />
                        <h6 className="font-semibold mt-5">Daftar Jawaban</h6>
                        <table className="w-full table-auto border-collapse border">
                            <thead className="bg-blue-50 dark:bg-slate-700">
                                <tr>
                                    <th className="text-left border px-3 py-1">
                                        No
                                    </th>
                                    <th className="text-left border px-3 py-1">
                                        Jawaban
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {v.Answer.map((w, j) => (
                                <tr>
                                    <td className="border px-3 py-1">
                                        {j + 1}
                                    </td>
                                    <td className="border px-3 py-1">{w.answer}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Button className="mt-5 w-full">Edit Jawaban</Button>
                    </div>
                ))}
                { survey.length == 0 ? (
                    <div className="flex justify-center items-center h-[10rem]">
                        <h3>Tidak ada survey yang tersedia</h3>
                    </div>
                ) : (<></>)}
            </div>
        </div>
    )
}