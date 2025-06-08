import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react"

export type ButtonClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

export type ButtonType = "primary" | "secondary" | "transparent"

export type TButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    children?: ReactNode | string
    className?: string,
}

export default function Button(
    {...rest} : TButton
){
    return (
        <button
            name={rest.name}
            className={`bg-blue-600 disabled:bg-blue-200 disabled:text-gray-600 
                dark:bg-blue-900 text-[#dfdfe4] disabled:cursor-not-allowed cursor-pointer 
                rounded-md px-5 py-3 ${rest.className}`} 
            onClick={rest.onClick}
        >
            {rest.children}
        </button>
    )
}