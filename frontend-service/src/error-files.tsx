import { useEffect, useState } from "react";
import icon from "./assets/icon.png"
import { getLocalStorageValue, setLocalStorageValue } from "./utils/local-storage";

export default function Index(): React.ReactNode{
    if(!getLocalStorageValue("dark-theme")){
        setLocalStorageValue("dark-theme", "0")
    }
    
    const [darkMode] = useState(parseInt(getLocalStorageValue("dark-theme") as string) == 1);

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
    }, [darkMode])

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 dark:bg-[#2b2b33] bg-white text-gray-600 dark:text-[#dfdfe4]">
            <img
                src={icon}
                alt="icon"
                className="w-16 h-16 mb-6 md:w-40 md:h-40"
            />      
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">404</h1>        
            <p className="text-lg md:text-xl text-gray-600 dark:text-[#dfdfe4] mb-6 text-center">
                Hmm... halaman ini tidak ditemukan. 🚧<br />
                Tapi jangan khawatir, kamu masih bisa kembali.
            </p>        
            <a
                href="/"
                className="inline-block px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:border-gray-900 dark:hover:border-blue-50 transition-colors"
            >
                Kembali ke Beranda
            </a>
    </div>
    )
}