import { useRef, useState, type ReactNode } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export type TCustomInputCallback = (value: string | number) => void

export type TCustomInput = {
    onChange?: TCustomInputCallback,
    className?: string,
    label?: string,
    placeholder?: string,
    type: "text"|"password"|"email"
}

export function Input(
    {...rest}
    : TCustomInput
): ReactNode{
    const ref = useRef<HTMLInputElement>(null)
    const [show, setShow] = useState(false)

    return (
        <div className={`${rest.className}`}>
            <h6 
                className="cursor-pointer font-semibold"
                onClick={() => ref.current?.focus()}
            >{rest.label}</h6>
            <div className="flex w-full">
                <input 
                    type={rest.type == "password" ? show ? "text" : rest.type : rest.type} 
                    ref={ref}
                    className="outline-none focus:ring focus:ring-blue-400 w-full
                                focus:dark:ring-[#dfdfe4] px-2 py-1 rounded-md
                                bg-white dark:bg-[#3b3b45] border border-blue-50 dark:border-[#dfdfe4]"
                    placeholder={rest.placeholder}
                />
                {rest.type == "password" ? (
                    <button className="bg-white dark:bg-[#3b3b45] border border-blue-50 mx-1
                                        dark:border-[#dfdfe4] px-2 py-1 rounded-md cursor-pointer"
                        onClick={() => setShow(!show)}
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