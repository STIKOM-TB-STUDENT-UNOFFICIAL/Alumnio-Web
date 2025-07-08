import { useRef, useState } from "react"

export function DragAndDropFiles(
    {
        file,
        setFile
    }
    :
    {
        file?: File | null,
        setFile?: React.Dispatch<React.SetStateAction<File | null>>
    }
){
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDrag, setIsDrag] = useState(false)
    return (
        <div
            className={`border border-dashed cursor-pointer transition duration-300 
                        ease-in-out flex flex-col justify-center items-center rounded-sm
                        min-w-[300px] min-h-[300px]
                        p-6 w-full ${isDrag ? "border-blue-400" : ""}`}
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
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if(selectedFile && setFile){
                        setFile(selectedFile)
                    }
                }}
            />
            {file ? file.name : "No File Selected"}
        </div>
    )
}