import { MenuContext } from "@/libs/context/menu-context";
import { MenuBarSurveyPage } from "@/libs/components/molecules/menu-bar-survey-page";
import { useEffect, useState, type ReactNode } from "react";
import { SurveyEditor } from "./editor";
import type { TSurvey } from "@/types/survey-types";
import { SurveyEditorContext } from "@/libs/context/survey-editor-context";
import Button from "@/libs/components/atoms/button";
import { patchSurveyService } from "@/services/patch-survey-service";
import { getSession } from "@/utils/session";
import { AiOutlineSave } from "react-icons/ai";
import { SurveyStatistics } from "./statistics";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { loadUserGraduateSurvey } from "@/services/load-user-graduate-survey";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function Index(): ReactNode {
    const [menu, setMenu] = useState(0);
    const [survey, setSurvey] = useState<TSurvey[]>([]);
    const [isEdited, setIsEdited] = useState(false);

    function load() {
        loadUserGraduateSurvey(getSession() as string).then((v) => {
            if (v) {
                setSurvey(
                    v.map((w) => {
                        w.Answer = w.Answer.map((x) => {
                            x.status = "NO_CHANGES";
                            return x;
                        });
                        w.status = "NO_CHANGES";
                        return w;
                    })
                );
            }
        });
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full py-10">
            <div
                className="w-full bg-white dark:bg-[#1e293b] 
                rounded-lg overflow-hidden shadow-sm
                px-10 py-10 gap-10"
            >
                <h3 className="text-3xl font-bold mb-5">Survey Pengguna Lulusan</h3>
                <div className="my-2">
                    <MenuContext.Provider value={{ menu, setMenu }}>
                        <MenuBarSurveyPage />
                    </MenuContext.Provider>
                </div>

                <SurveyEditorContext.Provider
                    value={{
                        isEdited,
                        survey,
                        setIsEdited,
                        setSurvey,
                    }}
                >
                    {menu == 0 ? (
                        <SurveyEditor />
                    ) : (
                        <SurveyStatistics />
                    )}
                </SurveyEditorContext.Provider>
                
            </div>
            {isEdited ? (
                <div className="sticky bottom-5">
                    <div className="flex justify-between my-5 bg-white dark:bg-[#1e293b] items-center p-2 shadow-lg rounded-md">
                        <h4 className="mx-5">Simpan perubahan ?</h4>
                        <Button
                            btntype="success"
                            className="flex items-center justify-center gap-3"
                            onClick={async () => {
                                await patchSurveyService(
                                    getSession() as string,
                                    survey
                                );
                                load();
                                setIsEdited(false);
                            }}
                        >
                            <AiOutlineSave />
                            Simpan
                        </Button>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
