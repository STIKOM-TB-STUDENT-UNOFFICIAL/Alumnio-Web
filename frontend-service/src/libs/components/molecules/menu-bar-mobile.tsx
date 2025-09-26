import { MenuContext } from "@/libs/context/menu-context";
import { useContext, type ReactNode } from "react";
import { AiOutlineContainer, AiOutlineFileText, AiOutlineFolderOpen, AiOutlineUser } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa6";

export function MenuBarMobile(): ReactNode {
    const { menu, setMenu } = useContext(MenuContext)

    return (
        <div className="w-full bg-blue-50 dark:bg-[#232325] p-2 rounded-t-xl sm:hidden grid-cols-5 gap-1 grid fixed bottom-0 z-5 left-0 right-0">
            <div
                className={`${menu == 0 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(0)}
            >
                <AiOutlineUser />
            </div>
            <div
                className={`${menu == 1 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(1)}
            >
                <FaBriefcase />
            </div>
            <div
                className={`${menu == 2 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(2)}
            >
                <AiOutlineFolderOpen />
            </div>
            <div
                className={`${menu == 3 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(3)}
            >
                <AiOutlineFileText />
            </div>
            <div
                className={`${menu == 4 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(4)}
            >
                <AiOutlineContainer />
            </div>
        </div>
    )
}