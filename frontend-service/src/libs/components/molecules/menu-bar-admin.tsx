import { MenuContext } from "@/libs/context/menu-context";
import { useContext, type ReactNode } from "react";
import { AiOutlineFolderOpen, AiOutlineUser } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa6";

export function MenuBarAdmin(): ReactNode {
    const { menu, setMenu } = useContext(MenuContext)

    return (
        <div className="w-full bg-blue-50 dark:bg-[#232325] p-2 rounded-md grid sm:grid-cols-2 lg:grid-cols-4 gap-1">
            <div
                className={`${menu == 0 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(0)}
            >
                <AiOutlineUser />
                <h4 className="text-sm">Alumni List</h4>
            </div>
            <div
                className={`${menu == 1 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(1)}
            >
                <AiOutlineUser />
                <h4 className="text-sm">Alumni Table</h4>
            </div>
            <div
                className={`${menu == 2 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(2)}
            >
                <FaBriefcase />
                <h4 className="text-sm">Administrator List</h4>
            </div>
            <div
                className={`${menu == 3 ? 'bg-white dark:bg-[#2b2b33]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer`}
                onClick={() => setMenu(3)}
            >
                <AiOutlineFolderOpen />
                <h4 className="text-sm">Settings</h4>
            </div>
        </div>
    )
}