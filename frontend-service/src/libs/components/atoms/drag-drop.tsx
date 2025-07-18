import { useRef, useState, type JSX } from "react"

export function DragAndDropFiles(
    {
        file,
        setFile,
        Icon,
        IconClass = "",
        IconSize = 15,
        label,
        ...rest
    }
    :
    React.HTMLAttributes<HTMLDivElement> & {
        Icon?: JSX.ElementType,
        IconClass?: string,
        IconSize?: number,
        file?: File | null,
        label?: string,
        setFile?: React.Dispatch<React.SetStateAction<File | null>>
    }
){
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [isDrag, setIsDrag] = useState(false)

    return (
        <div
            className={`border border-dashed cursor-pointer transition duration-300 
                        ease-in-out flex flex-col justify-center items-center rounded-md
                        min-w-[100%]
                        p-6 w-full ${isDrag ? "border-blue-400" : ""} ${rest.className}`}
            onClick={() => {
                inputRef.current?.click()
            }}
            onDrop={(e) => {
                e.preventDefault()
                setIsDrag(false)
                const droppedFile = e.dataTransfer.files[0]
                if(droppedFile){
                    if(setFile){
                        setFile(droppedFile)
                    }
                }
            }}
            onDragOver={(e) => {
                e.preventDefault()
                setIsDrag(true)
            }}
            onDragLeave={(e) => {
                e.preventDefault()
                setIsDrag(false)
            }}
        >
            { Icon? (
                <Icon 
                    className={IconClass}
                    size={IconSize}
                />
            ) : (<></>)}
            <h3 className="text-xl font-bold mb-5">{label? label : ""}</h3>
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if(selectedFile && setFile){
                        setFile(selectedFile)
                        if(inputRef.current){
                            inputRef.current.value = ""
                        }
                    }
                }}
            />
            {file ? file.name : "No File Selected"}
            <button className="w-full mt-3 dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer">
                Choose
            </button>
        </div>
    )
}