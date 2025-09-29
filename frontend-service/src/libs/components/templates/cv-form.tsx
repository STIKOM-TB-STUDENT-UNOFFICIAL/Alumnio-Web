import { useEffect, useState, type ReactNode } from "react";
import { DragAndDropFiles } from "../atoms/drag-drop";
import { AiOutlineFileText } from "react-icons/ai";
import { toast } from "sonner";
import { loadCvService } from "@/services/load-cv-service";
import { getSession } from "@/utils/session";
import { uploadCvService } from "@/services/upload-cv-service";
import { baseUrl } from "@/utils/base-url";
import Button from "../atoms/button";

export function CVForm(): ReactNode {
    const [file, setFile] = useState<File | null>(null)
    const [cv, setCV] = useState<string>("")

    async function loadCv(){
        const cvFile = await loadCvService(getSession() as string)
        if(cv != undefined){
            setCV(cvFile as string)
        }
    }

    useEffect(() => {
        loadCv()
    }, [])

    return (
        <div className="w-full bg-white dark:bg-[#1e293b] text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <h4 className="text-2xl font-semibold">CV Management</h4>
            <h6 className="text-sm">Upload dan download CV anda</h6>
            <DragAndDropFiles 
                className="mt-5"
                Icon={AiOutlineFileText}
                IconClass="h-[100px]"
                IconSize={75}
                label="Upload your CV"
                file={file}
                setFile={setFile}
                accept=".pdf,.doc,.docx"
            />
            <Button
                className="w-full mt-3 dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer"
                onClick={async () => {
                    if(!file){
                        return toast("Tidak ada file yang dipilih")
                    }
                    await uploadCvService(file)
                    setFile(null)
                    loadCv()
                }}
            >
                Perbarui CV
            </Button>
            <h4 className="font-semibold my-5">Current CV</h4>
            <div className="w-full bg-clr-surface-tonal-a10-light dark:bg-clr-surface-tonal-a10-dark shadow-sm p-5 rounded-lg my-5">
                { cv ? (
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div className="flex gap-2 items-center">
                        <AiOutlineFileText size={30} />
                        <h3 className="font-semibold">{cv}</h3>
                    </div>
                    <a href={baseUrl(`/uploads/documents/${cv}`)} target="_blank" className="px-2 py-1 bg-clr-success-a10-dark
                                    rounded-md flex gap-3 items-center hover:bg-clr-success-a20-dark cursor-pointer
                                    transition duration-200 text-center"
                    >
                        <h4 className="text-center w-full">
                            Download
                        </h4>
                    </a>
                </div>
                ) : (
                    <h3 className="text-center">
                        Anda belum pernah upload CV
                    </h3>
                ) }
            </div>
        </div>
    )
}