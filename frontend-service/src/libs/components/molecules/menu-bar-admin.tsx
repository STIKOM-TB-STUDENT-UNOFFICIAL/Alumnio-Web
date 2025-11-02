import { MenuContext } from "@/libs/context/menu-context";
import { useContext, type ReactNode } from "react";
import { AiOutlineContainer, AiOutlineUser } from "react-icons/ai";
import { FaBriefcase, FaGear } from "react-icons/fa6";

export function MenuBarAdmin(): ReactNode {
    const { menu, setMenu } = useContext(MenuContext)

    return (
        <div className="w-full shadow-sm bg-white dark:bg-[#1e293b] text-gray-500 dark:text-gray-200 p-2 rounded-md sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-1 hidden">
            <div
                className={`${menu == 0 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(0)}
            >
                <AiOutlineUser />
                <h4 className="text-sm">Alumni List</h4>
            </div>
            <div
                className={`${menu == 1 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(1)}
            >
                <AiOutlineUser />
                <h4 className="text-sm">Alumni Table</h4>
            </div>
            <div
                className={`${menu == 2 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(2)}
            >
                <FaBriefcase />
                <h4 className="text-sm">Administrator List</h4>
            </div>
            <div
                className={`${menu == 4 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(4)}
            >
                <AiOutlineContainer />
                <h4 className="text-sm">Lainnya</h4>
            </div>
            <div
                className={`${menu == 3 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(3)}
            >
                <FaGear />
                <h4 className="text-sm">Settings</h4>
            </div>
        </div>
    )
}