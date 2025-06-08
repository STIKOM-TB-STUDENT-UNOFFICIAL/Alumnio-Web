import { useEffect, useState, type ReactNode } from "react";
import { getLocalStorageValue, setLocalStorageValue } from "../../../utils/local-storage";

export default function SwitchModeToggle (): ReactNode {
    if(!getLocalStorageValue("dark-theme")){
        setLocalStorageValue("dark-theme", "0")
    }

    const [darkMode, setDarkMode] = useState(parseInt(getLocalStorageValue("dark-theme") as string) == 1);
    
    useEffect(() => {
        const html: HTMLHtmlElement = document.getElementsByTagName("html")[0]    
        const toggler = () => {
            html.classList = darkMode ? "dark" : "light"
        } 
        if (darkMode) {
            toggler()
            html.style.colorScheme = "dark"
            setLocalStorageValue("dark-theme", "1")
        } else {
            toggler()
            html.style.colorScheme = "light"
            setLocalStorageValue("dark-theme", "0")
        }
    }, [darkMode]);
    
    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-2 py-2 rounded-md hover:bg-blue-50 hover:dark:bg-[#3b3b45] cursor-pointer"
        >
            {darkMode ? "🌙" : "🌞"}
        </button>
    );
};