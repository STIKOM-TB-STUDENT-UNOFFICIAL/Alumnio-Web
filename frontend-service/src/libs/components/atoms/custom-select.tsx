import { useEffect, useRef, useState, type ReactNode } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";

export type TCustomSelectCallback = (value: string | number) => void

export type TCustomSelectData = {
    display: string,
    value: string | number
}

export type TCustomSelect = {
    onChange?: TCustomSelectCallback,
    className?: string,
    data: TCustomSelectData[]
}

export function CustomSelect(
    {
        data,
        ...rest
    } : TCustomSelect
): ReactNode {
    const ref = useRef<HTMLDivElement>(null)
    const [focus, setFocus] = useState(false)
    const [collapse, setCollapse] = useState(true)
    const [selected, setSelected] = useState("")

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)){
                setFocus(false)
            }
        }

        document.addEventListener("mousedown", handleClick)

        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    function toggleCollapse(){
        setFocus(!collapse)
        setCollapse(!collapse)
    }

    return (
        <div className={`text-gray-600 dark:text-[#dfdfe4] bg-transparent ${rest.className}`}>
            <div 
                className={`bg-white dark:bg-[#3b3b45] border dark:border-[#dfdfe4] border-blue-50 
                            rounded-md flex justify-between
                            px-2 py-1 font-semibold cursor-pointer
                            ${focus? "ring ring-blue-400 dark:ring-[#dfdfe4]" : ""}`}
                ref={ref}
                onClick={toggleCollapse}
            >
                {selected ? selected : "Select"}
                <AiOutlineCaretDown />
            </div>
            <div className={`relative pt-1 ${collapse? "hidden" : ""}`}>  
                <div 
                    className="absolute bg-white dark:bg-[#3b3b45] 
                                rounded-md 
                                px-2 py-1 w-full font-semibold cursor-pointer shadow-md"
                >
                    {data.map((v) => (
                        <div 
                            className="hover:bg-blue-50 hover:dark:bg-[#4a4a58] rounded-sm px-2 py-1"
                            onClick={() => {
                                if(rest.onChange){
                                    rest.onChange(v.value)
                                }
                                setSelected(v.display)
                                toggleCollapse()
                            }}
                        >
                            <h6>{v.display}</h6>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}