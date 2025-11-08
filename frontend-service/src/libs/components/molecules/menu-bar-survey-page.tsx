import { MenuContext } from "@/libs/context/menu-context";
import { useContext, type ReactNode } from "react";
import { AiOutlineDiff } from "react-icons/ai";
import { MdOutlineQueryStats } from "react-icons/md";

export function MenuBarSurveyPage(): ReactNode {
    const { menu, setMenu } = useContext(MenuContext)

    return (
        <div className="w-full shadow-sm bg-white dark:bg-clr-surface-tonal-a10-dark text-gray-500 dark:text-gray-200 p-2 rounded-md grid grid-cols-2 gap-1">
            <div
                className={`${menu == 0 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#1e293b] ' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(0)}
            >
                <AiOutlineDiff />
                <h4 className="text-sm">Editor</h4>
            </div>
            <div
                className={`${menu == 1 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#1e293b] ' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(1)}
            >
                <MdOutlineQueryStats />
                <h4 className="text-sm">Statistik</h4>
            </div>
        </div>
    )
}