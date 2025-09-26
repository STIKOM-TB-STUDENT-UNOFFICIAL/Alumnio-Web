import { MenuBar } from "@/libs/components/molecules/menu-bar";
import { MenuBarMobile } from "@/libs/components/molecules/menu-bar-mobile";
import { CVForm } from "@/libs/components/templates/cv-form";
import { PortfolioForm } from "@/libs/components/templates/portfolio-form";
import { ProfileForm } from "@/libs/components/templates/profile-form";
import { SurveyPage } from "@/libs/components/templates/survey-page";
import { WorkHistory } from "@/libs/components/templates/work-history";
import { MenuContext } from "@/libs/context/menu-context";
import { useState, type ReactNode } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Index(): ReactNode {
    const [ menu, setMenu ] = useState(0)

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            <div className="flex justify-between mt-10">
                <a href="/alumni/home">
                    <div className="flex items-center gap-2">
                        <AiOutlineArrowLeft />
                        <h4>Kembali</h4>
                    </div>
                </a>
            </div>
            <div className="mt-5">
                <MenuContext.Provider value={{menu, setMenu}}>
                    <MenuBar />
                    <MenuBarMobile />
                    { menu == 0 ? <ProfileForm /> : 
                      menu == 1 ? <WorkHistory /> : 
                      menu == 2 ? <PortfolioForm /> : 
                      menu == 3 ? <CVForm /> : <SurveyPage /> }
                </MenuContext.Provider>
            </div>
        </div>
    )
}