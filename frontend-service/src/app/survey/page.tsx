import Button from "@/libs/components/atoms/button";
import { loadUserGraduateSurvey } from "@/services/load-user-graduate-survey";
import { postGraduateUserService } from "@/services/post-graduate-user-service";
import type { TSurvey } from "@/types/survey-types";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

export default function Index(): ReactNode {
    const [survey, setSurvey] = useState<TSurvey[]>([]);
    const [isAnswering, setIsAnswering] = useState(false);
    const [searchParams, _] = useSearchParams();
    const [hasAnswer, setHasAnswer] = useState(false);
    const id = searchParams.get("id");

    function load() {
        loadUserGraduateSurvey().then((v) => {
            if (v) {
                setSurvey(v);
            }
        });
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="max-w-[1280px] w-full">
            <div className="bg-white dark:bg-clr-surface-tonal-a0-dark text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
                <h4 className="text-2xl font-semibold text-center">
                    Survey Pengguna Lulusan STIKOM Tunas Bangsa
                </h4>
            </div>
            {!hasAnswer ? (
                <>
                    {survey.map((v, i) => (
                        <div className="bg-white dark:bg-clr-surface-tonal-a0-dark text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
                            <h6 className="font-semibold">
                                {i + 1}. {v.questions}
                            </h6>
                            {v.Answer.map((w, j) => (
                                <div
                                    className="flex items-center gap-2"
                                    key={j}
                                >
                                    <input
                                        type="radio"
                                        id={`${w.id}`}
                                        value={w.answer}
                                        checked={w.id == v.UserAnswer}
                                        onClick={() => {
                                            const temp = [...survey];
                                            temp[i].UserAnswer = w.id;
                                            setSurvey(temp);
                                            setIsAnswering(true);
                                        }}
                                    />
                                    <label htmlFor={`${w.id}`}>
                                        {w.answer}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <Button
                            disabled={!isAnswering}
                            onClick={async () => {
                                let fullAnswer = false;

                                survey.map((v) => {
                                    if (!v.UserAnswer || fullAnswer) {
                                        fullAnswer = true;
                                    }
                                });

                                if (fullAnswer) {
                                    toast(
                                        "Anda belum menjawab semua survey, silahkan periksa lagi"
                                    );
                                    return;
                                }

                                await postGraduateUserService(
                                    parseInt(atob(id ?? "")),
                                    survey
                                );
                                setIsAnswering(false);
                                setHasAnswer(true)
                                load();
                            }}
                        >
                            Kirim
                        </Button>
                    </div>
                </>
            ) : (
                <div 
                    className="bg-white border border-clr-success-a0-light dark:border-clr-success-a0-dark flex flex-col justify-center items-center
                    dark:bg-clr-surface-tonal-a0-dark text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5 min-h-[20rem]"
                    
                >
                    <h4 className="font-semibold text-xl">Terima kasih telah menjawab survey</h4>
                    <Button className="mt-5" onClick={() => {document.location.href = '/'}}>
                        Halaman Utama
                    </Button>
                </div>
            )}
        </div>
    );
}
