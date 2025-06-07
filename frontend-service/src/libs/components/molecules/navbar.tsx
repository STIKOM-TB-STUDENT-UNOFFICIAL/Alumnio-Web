import type { ReactNode } from "react";
import icon from "../../../assets/icon.png"
import SwitchModeToggle from "../atoms/switch-theme";

export default function Navbar(): ReactNode {
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
                <div className="flex">
                    <SwitchModeToggle />
                </div>
            </div>
        </nav>
    )
}