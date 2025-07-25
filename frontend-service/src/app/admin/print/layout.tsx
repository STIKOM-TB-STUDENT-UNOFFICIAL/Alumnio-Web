import { Outlet } from "react-router-dom";

export default function Layout(): React.ReactNode{
    document.title = "Alumnio - Dashboard"
    
    return (
        <Outlet />
    )
}