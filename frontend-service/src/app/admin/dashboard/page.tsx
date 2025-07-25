import { MenuBarAdmin } from "@/libs/components/molecules/menu-bar-admin";
import { AdminPageAdministratorTable } from "@/libs/components/templates/admin-page-administrator-table";
import { AdminPageAlumniTable } from "@/libs/components/templates/admin-page-alumni-table";
import { AdminPageAlumniView } from "@/libs/components/templates/admin-page-alumni-view";
import { AdminPageSettings } from "@/libs/components/templates/admin-page-settings";
import { MenuContext } from "@/libs/context/menu-context";
import { useState, type ReactNode } from "react";

export default function Index(): ReactNode {
    const [menu, setMenu] = useState(0)

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            <div className="mt-5">
                <MenuContext.Provider value={{menu, setMenu}}>
                    <MenuBarAdmin />
                </MenuContext.Provider>
            </div>
            { menu === 0 ? (<AdminPageAlumniView />) : 
            menu === 1 ? (<AdminPageAlumniTable />) : 
            menu === 2 ? (<AdminPageAdministratorTable />) : 
            menu === 3 ? (<AdminPageSettings />) : (<></>) }
        </div>
    )
}