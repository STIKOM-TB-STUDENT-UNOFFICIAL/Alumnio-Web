import { Input } from "@/libs/components/atoms/input";
import { useContext, useEffect, useState, type ReactNode } from "react";
import { SurveyEditorContext } from "@/libs/context/survey-editor-context";
import { Pie } from 'react-chartjs-2';

const generateRandomColors = (count: number) => {
    return Array.from({ length: count }, () =>
      `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`
    );
};

export function SurveyStatistics(): ReactNode {
    const { survey, setSurvey } = useContext(SurveyEditorContext);
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"))

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"))
        })

        observer.observe(document.documentElement, { attributes: true })

        return () => observer.disconnect()
    })

    return (
        <>
            {survey.map((v, i) => (
                <div
                    className={`block bg-clr-surface-tonal-a10-light mb-5 dark:bg-clr-surface-tonal-a10-dark p-4 rounded-md shadow-sm overflow-x-auto ${
                        v.status == "DELETED"
                            ? "border-3 border-clr-danger-a0-light dark:border-clr-danger-a0-dark"
                            : ""
                    }`}
                    key={i}
                >
                    <h6 className="font-semibold">Pertanyaan ke {i + 1}</h6>
                    <Input
                        type="text"
                        disabled
                        value={v.questions}
                        onChange={(e) => {
                            const temp = [...survey];
                            temp[i].questions = e.target.value;
                            setSurvey(temp);
                        }}
                    />
                    <div className="flex justify-center my-2">
                        <div className="sm:w-[15rem]">
                            <Pie data={
                                {
                                    labels: v.Answer.map((v) => v.answer),
                                    datasets: [
                                        {
                                            label: 'Responden',
                                            data: v.Answer.map((v) => v._count?.UserAnswer),
                                            backgroundColor: generateRandomColors(v.Answer.length),
                                            borderWidth: 2,
                                        }
                                    ]
                                }
                            } options={{
                                plugins: {
                                    legend: {
                                        position: "top",
                                        labels: {
                                            color: isDark ? "#fff" : "#000",
                                        },
                                    }
                                }
                            }}/>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
