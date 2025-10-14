import { type ReactNode } from "react";
import { Input } from "../atoms/input";
import Button from "../atoms/button";

const questions = [
    {
        question: "ABCD",
        answers: [
            {
                id: 0,
                answer: "Abcdefg",
                checked: false
            },
            {
                id: 1,
                answer: "Abcdefg",
                checked: false
            }
        ]
    },
    {
        question: "ABCD",
        answers: [
            {
                id: 0,
                answer: "Abcdefg",
                checked: false
            },
            {
                id: 1,
                answer: "Abcdefg",
                checked: false
            }
        ]
    }
]

export function SurveyPage(): ReactNode {
    return (
    <>
        <div className="w-full bg-white dark:bg-clr-surface-tonal-a0-dark text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <h4 className="text-2xl font-semibold">Survey Pengguna Lulusan</h4>
            <h6 className="text-sm">Berikan penilaian tentang anda oleh perusahaan anda</h6>
            <div className="w-full bg-clr-surface-tonal-a10-light dark:bg-clr-dark-a0 p-3 my-3 rounded-sm flex flex-col sm:flex-row gap-5">
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
            <div className="grid grid-flow-row mt-5 gap-2">
                {questions.map((v, i) => (
                    <div className="block" key={i}>
                        <h6 className="font-semibold">{i + 1}. {v.question}</h6>
                        {v.answers.map((v, j) => (
                            <div className="flex items-center gap-2" key={j}>
                                <input 
                                    type="radio" 
                                    name="" id="" 
                                    value={v.answer} 
                                    checked={v.checked} 
                                />
                                <h6>{v.answer}</h6>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </>
    )
}