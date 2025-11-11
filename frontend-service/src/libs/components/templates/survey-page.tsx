import { useEffect, useRef, useState, type ReactNode } from "react";
import { Input } from "../atoms/input";
import Button from "../atoms/button";
import { loadSurveyService } from "@/services/load-survey-service";
import { getSession } from "@/utils/session";
import type { TSurvey } from "@/types/survey-types";
import { toast } from "sonner";
import { postSurveyAnswer } from "@/services/post-survey-answer";

const token = getSession() as string
const payload = token.split(".")[1]
const payloadDecoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
const link = `${window.location.protocol}//${window.location.host}/survey?id=${btoa(payloadDecoded.userId)}`

export function SurveyPage(): ReactNode {
    const [ survey, setSurvey ] = useState<TSurvey[]>([])
    const [ isAnswering, setIsAnswering ] = useState(false)
    const refInput = useRef<HTMLInputElement>(null)

    function load(){
        loadSurveyService(getSession() as string)
            .then((v) => {
                if(v){
                    setSurvey(v)
                    console.log(v)
                }
            })
    }

    useEffect(() => {
        load()
    }, [])

    return (
    <>
        <div className="w-full bg-white dark:bg-clr-surface-tonal-a0-dark text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <h4 className="text-2xl font-semibold">Survey Pengguna Lulusan</h4>
            <h6 className="text-sm">Berikan penilaian tentang anda oleh perusahaan anda</h6>
            <div className="w-full bg-clr-surface-tonal-a10-light dark:bg-clr-dark-a0 p-3 my-3 rounded-md flex flex-col sm:flex-row gap-5">
                <Input 
                    type="text"
                    className="w-full"
                    value={link}
                    label="Link survey pengguna lulusan"
                    ref={refInput}
                    disabled
                />
                <Button onClick={() => {
                    refInput.current?.select()
                    refInput.current?.setSelectionRange(0, 99999)

                    navigator.clipboard.writeText(refInput.current?.value as string)

                    toast("Berhasil menyalin link survey")
                }}>
                    Salin
                </Button>
            </div>
        </div>
        <div className="w-full bg-white dark:bg-[#1e293b] text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <h4 className="text-2xl font-semibold">Survey Alumni</h4>
            <h6 className="text-sm">Berikan penilaian anda tentang kampus STIKOM Tunas Bangsa</h6>
            <div className="grid grid-flow-row mt-5 gap-2">
                { survey.map((v, i) => (
                    <div className="block" key={i}>
                        <h6 className="font-semibold">{i + 1}. {v.questions}</h6>
                        {v.Answer.map((w, j) => (
                            <div className="flex items-center gap-2" key={j}>
                                <input
                                    type="radio"
                                    id={`${w.id}`}
                                    value={w.answer} 
                                    checked={w.id == v.UserAnswer}
                                    onClick={() => {
                                        const temp = [...survey]
                                        temp[i].UserAnswer = w.id
                                        setSurvey(temp)
                                        setIsAnswering(true)
                                    }}
                                />
                                <label htmlFor={`${w.id}`}>{w.answer}</label>
                            </div>
                        ))}
                    </div>
                ))}
                { survey.length == 0 ? (
                    <div className="flex justify-center items-center h-[10rem]">
                        <h3>Tidak ada survey yang tersedia</h3>
                    </div>
                ) : (<></>)}
                <Button 
                    disabled={!isAnswering}
                    onClick={async () => {
                        let fullAnswer = false

                        survey.map((v) => {
                            if(!v.UserAnswer || fullAnswer){
                                fullAnswer = true
                            }
                        })

                        if(fullAnswer){
                            toast("Anda belum menjawab semua survey, silahkan periksa lagi")
                            return
                        }

                        await postSurveyAnswer(getSession() as string, survey)
                        setIsAnswering(false)
                        load()
                    }}
                >Submit</Button>
            </div>
        </div>
    </>
    )
}