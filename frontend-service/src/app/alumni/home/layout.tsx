import { Outlet } from "react-router-dom";
import Navbar from "@/libs/components/molecules/navbar";

export default function Layout(): React.ReactNode{
    document.title = "Alumnio - Dashboard"
    
    return (
        <div className="min-h-screen dark:bg-[#0F172A] bg-gray-50 text-gray-600 dark:text-[#dfdfe4] pb-30 transition duration-200">
            <Navbar />
            <div className="px-10 flex justify-center">
                <Outlet />
            </div>
        </div>
    )
}