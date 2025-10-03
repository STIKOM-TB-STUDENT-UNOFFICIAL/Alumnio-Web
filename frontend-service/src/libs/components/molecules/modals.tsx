import type { ReactNode } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export function Modals(
    {
        show,
        control,
        title,
        children
    }
    :
    {
        show: boolean,
        title?: string,
        control?: React.Dispatch<React.SetStateAction<boolean>>
        children?: ReactNode
    }
): ReactNode{
    return (
        <div className={`fixed z-[200] top-0 left-0 w-full min-h-[100vh] bg-black/20 flex flex-col justify-center items-center ${!show ? "hidden" : ""}`}>
            <div className="min-w-[400px] dark:bg-clr-surface-tonal-a20-dark bg-white text-gray-600 dark:text-[#dfdfe4] px-5 py-5 rounded-md">
                <div className="flex justify-between items-center border-b-1 pb-3">
                    <h5>{title ?? "Untitled"}</h5>
                    <button 
                        className="cursor-pointer"
                        onClick={() => control ? control(false) : () => {}}
                    >
                        <AiOutlineCloseCircle />
                    </button>
                </div>
                <div className="mt-3">
                    {children ?? <>No Children</>}
                </div>
            </div>
        </div>
    )
}