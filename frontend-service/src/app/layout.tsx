import { Outlet } from "react-router-dom";
import Navbar from "../libs/components/molecules/navbar";

export default function Index(): React.ReactNode{
    document.title = "Alumnio"
    return (
        <div className="min-h-screen dark:bg-[#2b2b33] bg-white text-gray-600 dark:text-[#dfdfe4] pb-30">
            <Navbar />
            <div className="px-10 flex justify-center">
                <Outlet />
            </div>
        </div>
    )
}