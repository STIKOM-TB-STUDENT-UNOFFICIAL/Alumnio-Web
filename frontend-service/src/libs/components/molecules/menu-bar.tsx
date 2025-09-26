import { MenuContext } from "@/libs/context/menu-context";
import { useContext, type ReactNode } from "react";
import { AiOutlineContainer, AiOutlineFileText, AiOutlineFolderOpen, AiOutlineUser } from "react-icons/ai";
import { FaBriefcase } from "react-icons/fa6";

export function MenuBar(): ReactNode {
    const { menu, setMenu } = useContext(MenuContext)

    return (
        <div className="w-full bg-white shadow-sm dark:bg-[#1e293b] text-gray-500 p-2 rounded-md sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-1 hidden">
            <div
                className={`${menu == 0 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(0)}
            >
                <AiOutlineUser />
                <h4 className="text-sm">Profil</h4>
            </div>
            <div
                className={`${menu == 1 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(1)}
            >
                <FaBriefcase />
                <h4 className="text-sm">Riwayat Pekerjaan</h4>
            </div>
            <div
                className={`${menu == 2 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(2)}
            >
                <AiOutlineFolderOpen />
                <h4 className="text-sm">Portfolio</h4>
            </div>
            <div
                className={`${menu == 3 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(3)}
            >
                <AiOutlineFileText />
                <h4 className="text-sm">CV</h4>
            </div>
            <div
                className={`${menu == 4 ? 'bg-blue-100 text-blue-600 font-medium border-blue-500 dark:bg-[#0f172a]' : ''} p-2 rounded-sm flex justify-center items-center gap-2 cursor-pointer hover:text-blue-500 transition`}
                onClick={() => setMenu(4)}
            >
                <AiOutlineContainer />
                <h4 className="text-sm">Survey</h4>
            </div>
        </div>
    )
}