import { useState, type ReactNode } from "react";
import { DragAndDropFiles } from "../atoms/drag-drop";
import { AiOutlineFileText } from "react-icons/ai";
import { toast } from "sonner";

export function CVForm(): ReactNode {
    const [file, setFile] = useState<File | null>(null)

    return (
        <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
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
            />
            <button
                className="w-full mt-3 dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer"
                onClick={() => {
                    if(!file){
                        return toast("Tidak ada file yang dipilih")
                    }
                }}
            >
                Perbarui CV
            </button>
            <h4 className="font-semibold my-5">Current CV</h4>
            <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <AiOutlineFileText size={30} />
                        <h3 className="font-semibold">John_Doe.pdf</h3>
                    </div>
                    <div className="flex gap-4">
                        <button className="border dark:border-[#232325] border-blue-50 px-2 py-1 dark:bg-[#2b2b33] bg-white
                                        rounded-md flex gap-3 items-center hover:dark:bg-[#34343f] hover:bg-[#e3edfd] cursor-pointer
                                        transition duration-200"
                        >
                            Preview
                        </button>
                        <button className="border dark:border-[#232325] border-blue-50 px-2 py-1 dark:bg-[#2b2b33] bg-white
                                        rounded-md flex gap-3 items-center hover:dark:bg-[#34343f] hover:bg-[#e3edfd] cursor-pointer
                                        transition duration-200"
                        >
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}