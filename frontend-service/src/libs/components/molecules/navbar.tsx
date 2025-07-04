import { useContext, type ReactNode } from "react";
import icon from "../../../assets/icon.png"
import SwitchModeToggle from "../atoms/switch-theme";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { AuthContext } from "@/libs/context/auth-context";
import { logOutService } from "@/services/auth-service";

export default function Navbar(): ReactNode {
    const { session } = useContext(AuthContext)

    return (
        <nav className="w-full sticky top-0 border-b border-b-blue-50 dark:border-b-[#313139]
                        px-10 py-3 flex justify-center dark:bg-[#2b2b33] bg-white">
            <div className="flex justify-between max-w-[1280px] w-full">
                <div className="flex items-center justify-center">
                    <img src={icon} alt="icon" width={40} height={40} />
                    <a href="/" className="text-2xl text-transparent bg-gradient-to-r from-blue-500
                                        to-blue-700 dark:from-blue-50 dark:to-blue-300 bg-clip-text font-semibold mx-2">
                        Alumnio Web
                    </a>
                </div>
                <div className="flex gap-2">
                    <SwitchModeToggle />
                    {session != "" ? (
                        <button
                            className="text-sm px-2 py-2 rounded-md hover:bg-blue-50 hover:dark:bg-[#3b3b45] cursor-pointer"
                            onClick={() => {
                                logOutService()
                            }}
                        >
                            <FaArrowRightFromBracket />
                        </button>
                    ) : (<></>)}
                </div>
            </div>
        </nav>
    )
}