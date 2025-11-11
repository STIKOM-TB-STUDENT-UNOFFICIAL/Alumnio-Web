import { DragAndDropFiles } from "@/libs/components/atoms/drag-drop";
import { uploadXLSX } from "@/services/upload-xlsx-service";
import { useState, type ReactNode } from "react";
import { AiOutlineFileExcel } from "react-icons/ai";

export default function Index(): ReactNode {
    const [file, setFile] = useState<File | null>(null);

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            <div
                className="w-full bg-white dark:bg-[#1e293b] 
                rounded-lg overflow-hidden shadow-sm
                px-10 py-10 gap-10 my-10"
            >
                <div className="flex justify-between">
                    <div className="block">
                        <h3 className="text-3xl font-bold">Tambah Alumni</h3>
                        <h6 className="text-sm font-medium">
                            Upload data alumni
                        </h6>
                    </div>
                    <a
                        href="/Template XLSX Alumnio.xlsx"
                        target="_blank"
                        className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                  dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2 text-sm cursor-pointer"
                    >
                        Download Template
                    </a>
                </div>
                <DragAndDropFiles
                    Icon={AiOutlineFileExcel}
                    IconSize={50}
                    file={file}
                    setFile={setFile}
                    label="Upload Excel File"
                    className="my-5"
                    accept=".xls,.xlsx"
                />
                <div className="flex justify-end gap-5">
                    <button
                        className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                             dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2 text-sm cursor-pointer"
                        onClick={async () => {
                            if (file) {
                                uploadXLSX(file);
                                setFile(null);
                            }
                        }}
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
