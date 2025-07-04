import { useRef, useState, type DetailedHTMLProps, type ElementType, type InputHTMLAttributes, type ReactNode } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type TCustomInput = Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "type"> & {
    label?: string,
    type: "text"|"password"|"email"|"date"|"checkbox",
    Icon?: ElementType
}

export function Input(
    {type = "text", className = "", Icon, ...rest}
    : TCustomInput
): ReactNode{
    const ref = useRef<HTMLInputElement>(null)
    const [show, setShow] = useState(false)
    return (
        <div className={`${className}`}>
            <h6 
                className="cursor-pointer font-semibold"
                onClick={() => ref.current?.focus()}
            >{rest.label}</h6>
            <div 
                className={`flex w-full bg-white dark:bg-[#3b3b45] border 
                border-blue-50 dark:border-[#313139] rounded-md focus-within:ring focus-within:ring-blue-400 dark:focus-within:ring dark:focus-within:ring-[#dfdfe4]`}
            >
                {Icon ? (
                    <div className="flex items-center justify-center px-2">
                        <Icon />
                    </div>
                ) : (<></>)}
                <input 
                    type={type == "password" ? show ? "text" : type : type} 
                    ref={ref}
                    name={rest.name}
                    className="outline-none w-full px-2 py-1 rounded-md"
                    placeholder={rest.placeholder}
                    onChange={rest.onChange}
                    
                    {...rest}
                />
                {type == "password" ? (
                    <button className="bg-white dark:bg-[#3b3b45] border border-blue-50 ml-1
                                        dark:border-[#313139] px-2 py-1 rounded-sm cursor-pointer active:bg"
                        onClick={() => setShow(!show)}
                        type="button"
                    >
                        {!show ? (
                            <AiOutlineEye />
                        ):(<AiOutlineEyeInvisible />)}
                    </button>
                ) : (<></>)}
            </div>
        </div>
    )
}