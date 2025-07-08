import { useState } from "react";
import { DragAndDropFiles } from "../atoms/drag-drop";
import { uploadProfilePict } from "@/services/upload-profile-pict";

export function ProfilePictUploads(
    {
        control,
        callback
    }:{
        control: React.Dispatch<React.SetStateAction<boolean>>,
        callback: () => void
    }
){
    const [file, setFile] = useState<File | null>(null)
    const [load, setLoad] = useState(false)

    return (
        <>
            <DragAndDropFiles
                setFile={setFile}
                file={file}
            />
            <button 
                className="w-full mt-3 dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer"
                disabled={load}
                onClick={async () => {
                    if(file){
                        setLoad(true)
                        await uploadProfilePict(file)
                        setLoad(false)
                        setFile(null)
                        callback()
                        control(false)
                    }
                }}
            >Kirim</button>
        </>
    )
}