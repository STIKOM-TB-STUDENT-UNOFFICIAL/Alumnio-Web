import { MenuBar } from "@/libs/components/molecules/menu-bar";
import { CVForm } from "@/libs/components/organism/cv-form";
import { PortfolioForm } from "@/libs/components/organism/portfolio-form";
import { ProfileForm } from "@/libs/components/organism/profile-form";
import { WorkHistory } from "@/libs/components/organism/work-history";
import { MenuContext } from "@/libs/context/menu-context";
import { useState, type ReactNode } from "react";

export default function Index(): ReactNode {
    const [ menu, setMenu ] = useState(0)

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            <div className="flex justify-between mt-10">
                <div className="block">
                    <h3 className="text-3xl font-bold">Dashboard Alumni</h3>
                    <h6 className="text-sm font-medium">Kelola profil alumni anda</h6>
                </div>
            </div>
            <div className="mt-5">
                <MenuContext.Provider value={{menu, setMenu}}>
                    <MenuBar />
                    { menu == 0 ? <ProfileForm /> : 
                      menu == 1 ? <WorkHistory /> : 
                      menu == 2 ? <PortfolioForm /> : <CVForm />}
                </MenuContext.Provider>
            </div>
        </div>
    )
}