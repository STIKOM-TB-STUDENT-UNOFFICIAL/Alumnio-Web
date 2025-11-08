import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type ButtonClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

export type ButtonType = "primary" | "secondary" | "transparent" | "danger" | "success" | "warning"
export type ButtonSize = "small" | "medium" | "large" | "huge"

export type TButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children?: ReactNode | string
    size?: ButtonSize,
    btntype?: ButtonType
}

export default function Button(
    {className, ...rest} : TButton
){
    if(!rest.size){
        rest.size = "medium"
    }

    let bgColor = ""

    if(!rest.btntype){
        bgColor = "bg-blue-600 disabled:bg-blue-200 disabled:text-gray-600 dark:bg-blue-900"
    }
    else{
        switch(rest.btntype){
            case "primary":
                bgColor = "bg-blue-600 disabled:bg-blue-200 disabled:text-gray-600 dark:bg-blue-900"
                break
            case "danger":
                bgColor = "bg-clr-danger-a10-light disabled:bg-clr-danger-a0-light"
                break
            case "success":
                bgColor = "bg-clr-success-a10-light disabled:bg-clr-success-a0-light"
                break
            case "warning":
                bgColor = "bg-yellow-500 disabled:bg-yellow-200 text-white dark:bg-yellow-700"
                break
            default:
                bgColor = "bg-blue-600 disabled:bg-blue-200 disabled:text-gray-600 dark:bg-blue-900"
        }
    }

    const cn = `${bgColor} text-white disabled:cursor-not-allowed cursor-pointer rounded-md px-5 py-3 ${className}`

    return (
        <button
            name={rest.name}
            className={cn} 
            onClick={rest.onClick}
            {...rest}
        >
            {rest.children}
        </button>
    )
}