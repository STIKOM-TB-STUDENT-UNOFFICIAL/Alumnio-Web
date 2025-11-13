import Button from "@/libs/components/atoms/button";
import { Input } from "@/libs/components/atoms/input";
import { Modals } from "@/libs/components/molecules/modals";
import { useContext, useState, type ReactNode } from "react";
import { AiFillEdit, AiOutlineFileAdd } from "react-icons/ai";
import { FaRegSave, FaRegTrashAlt } from "react-icons/fa";
import { IoMdUndo } from "react-icons/io";
import { templatePenilaian, templateSentimen } from "./template";
import { SurveyEditorContext } from "@/libs/context/survey-editor-context";

export function SurveyEditor(): ReactNode {
    const { survey, setIsEdited, setSurvey } = useContext(SurveyEditorContext);
    const [showEditAnswer, setShowEditAnswer] = useState(false);
    const [selectedSurveyIndex, setSelectedSurveyIndex] = useState<number>(-1);

    return (
        <>
            <Modals
                title="Edit Jawaban"
                show={showEditAnswer}
                control={setShowEditAnswer}
            >
                <div className="overflow-y-auto max-h-[80vh] md:w-[30rem]">
                    <table className="w-full table-auto border-collapse">
                        {survey[selectedSurveyIndex]?.Answer.map((v, i) => (
                            <tr
                                className={
                                    v.status == "DELETED"
                                        ? "bg-clr-danger-a10-light"
                                        : ""
                                }
                            >
                                <td className="px-1 py-1">
                                    <Input
                                        type="textarea"
                                        value={v.answer}
                                        onChange={(e) => {
                                            setIsEdited(true);
                                            const temp = [...survey];
                                            temp[selectedSurveyIndex].Answer[
                                                i
                                            ].answer = e.target.value;
                                            temp[selectedSurveyIndex].Answer[i].status = temp[selectedSurveyIndex].Answer[i].status != "NEW" ? temp[selectedSurveyIndex].status != "DELETED" ? "CHANGED" : "DELETED" : "NEW"
                                            setSurvey(temp);
                                        }}
                                    />
                                </td>
                                <td className="px-1 py-1 flex justify-center items-center">
                                    <Button
                                        btntype="danger"
                                        onClick={() => {
                                            setIsEdited(true);
                                            const temp = [...survey];
                                            if (v.status != "NEW") {
                                                if (v.status != "DELETED") {
                                                    temp[
                                                        selectedSurveyIndex
                                                    ].Answer[i].status =
                                                        "DELETED";
                                                    setSurvey(temp);
                                                    return;
                                                }
                                                temp[
                                                    selectedSurveyIndex
                                                ].Answer[i].status = "CHANGED";
                                                setSurvey(temp);
                                                return;
                                            }
                                            temp[selectedSurveyIndex].Answer =
                                                temp[
                                                    selectedSurveyIndex
                                                ].Answer.filter(
                                                    (_, idx) => idx != i
                                                );
                                            setSurvey(temp);
                                        }}
                                    >
                                        {v.status == "DELETED" ? (
                                            <IoMdUndo />
                                        ) : (
                                            <FaRegTrashAlt />
                                        )}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </table>
                    <div className="flex justify-end gap-2">
                        <Button
                            className="mt-5 w-full flex items-center justify-center gap-2"
                            onClick={() => {
                                setIsEdited(true);
                                const temp = [...survey];
                                temp[selectedSurveyIndex].Answer.push({
                                    id: -1,
                                    answer: "",
                                    surveyId: survey[selectedSurveyIndex].id,
                                    status: "NEW",
                                });
                                setSurvey(temp);
                            }}
                        >
                            <AiOutlineFileAdd />
                            Tambah
                        </Button>
                        <Button
                            className="mt-5 w-full flex items-center justify-center gap-2"
                            btntype="success"
                            onClick={() => setShowEditAnswer(false)}
                        >
                            <FaRegSave />
                            Tutup
                        </Button>
                    </div>
                </div>
            </Modals>
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
                        type="textarea"
                        value={v.questions}
                        onChange={(e) => {
                            setIsEdited(true)
                            const temp = [...survey];
                            temp[i].questions = e.target.value;
                            temp[i].status = temp[i].status != "NEW" ? "CHANGED" : temp[i].status
                            setSurvey(temp);
                        }}
                    />
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

                        {v.Answer.length == 0 ? (
                            <tbody>
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="border px-3 py-1 text-center"
                                    >
                                        Tidak ada data
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="border px-3 py-1 text-center"
                                    >
                                        <div className="flex justify-center gap-2">
                                            <Button
                                                btntype="warning"
                                                onClick={() => {
                                                    setIsEdited(true);
                                                    const temp = [...survey];
                                                    temp[i].Answer =
                                                        templateSentimen.map(
                                                            (v) => {
                                                                return {
                                                                    id: -1,
                                                                    surveyId:
                                                                        temp[i]
                                                                            .id,
                                                                    answer: v,
                                                                    status: "NEW",
                                                                };
                                                            }
                                                        );
                                                    temp[i].status = temp[i].status != "NEW" ? "CHANGED" : temp[i].status
                                                    setSurvey(temp);
                                                }}
                                            >
                                                Template Sentimen
                                            </Button>
                                            <Button
                                                btntype="success"
                                                onClick={() => {
                                                    setIsEdited(true);
                                                    const temp = [...survey];
                                                    temp[i].Answer =
                                                        templatePenilaian.map(
                                                            (v) => {
                                                                return {
                                                                    id: -1,
                                                                    surveyId:
                                                                        temp[i]
                                                                            .id,
                                                                    answer: v,
                                                                    status: "NEW",
                                                                };
                                                            }
                                                        );
                                                    temp[i].status = temp[i].status != "NEW" ? "CHANGED" : temp[i].status
                                                    setSurvey(temp);
                                                }}
                                            >
                                                Template Penilaian
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {v.Answer.map((w, j) =>
                                    w.status != "DELETED" ? (
                                        <tr key={j}>
                                            <td className="border px-3 py-1">
                                                {j + 1}
                                            </td>
                                            <td className="border px-3 py-1">
                                                {w.answer}
                                            </td>
                                        </tr>
                                    ) : (
                                        <></>
                                    )
                                )}
                            </tbody>
                        )}
                    </table>
                    <div className="flex flex-col sm:flex-row justify-end gap-2">
                        <Button
                            className="mt-5 flex items-center justify-center gap-2"
                            onClick={() => {
                                setSelectedSurveyIndex(i);
                                setShowEditAnswer(true);
                            }}
                        >
                            <AiFillEdit />
                            Edit Jawaban
                        </Button>
                        <Button
                            className="mt-5 flex items-center justify-center gap-2"
                            btntype="danger"
                            onClick={() => {
                                setIsEdited(true);
                                let temp = [...survey];
                                if (v.status != "NEW") {
                                    if (v.status != "DELETED") {
                                        temp[i].status = "DELETED";
                                        setSurvey(temp);
                                        return;
                                    }
                                    temp[i].status = "CHANGED";
                                    setSurvey(temp);
                                    return;
                                }

                                temp = temp.filter((_, idx) => idx != i);
                                setSurvey(temp);
                            }}
                        >
                            {v.status == "DELETED" ? (
                                <IoMdUndo />
                            ) : (
                                <FaRegTrashAlt />
                            )}
                        </Button>
                    </div>
                </div>
            ))}
            {survey.length == 0 ? (
                <div className="flex justify-center items-center h-[10rem]">
                    <h3>Tidak ada survey yang tersedia</h3>
                </div>
            ) : (
                <></>
            )}
            <div className="flex justify-end">
                <Button
                    className="mt-5 flex items-center justify-center gap-2"
                    onClick={() => {
                        const temp = [...survey];
                        setIsEdited(true);
                        temp.push({
                            id: -1,
                            surveyType: "GRADUATE_USER",
                            questions: "",
                            Answer: [],
                            status: "NEW",
                            UserAnswer: undefined,
                        });
                        setSurvey(temp);
                    }}
                >
                    <AiOutlineFileAdd />
                    Tambah
                </Button>
            </div>
            
        </>
    );
}
