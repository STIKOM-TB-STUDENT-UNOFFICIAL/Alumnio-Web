import type { TSurvey } from "@/types/survey-types";
import { createContext } from "react";

export const SurveyEditorContext = createContext({
    isEdited: false,
    survey: [],
    setIsEdited: () => {},
    setSurvey: () => {}
} as {
    isEdited: boolean,
    survey: TSurvey[],
    setIsEdited: React.Dispatch<React.SetStateAction<boolean>>
    setSurvey: React.Dispatch<React.SetStateAction<TSurvey[]>>
});