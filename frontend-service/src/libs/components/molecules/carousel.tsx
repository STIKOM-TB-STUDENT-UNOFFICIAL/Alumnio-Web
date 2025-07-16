import { useEffect, useState, type ReactNode } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { DragAndDropFiles } from "../atoms/drag-drop";
import { uploadPortfolioAttachmentService } from "@/services/upload-portfolio-attachment-service";
import { getSession } from "@/utils/session";
import { baseUrl } from "@/utils/base-url";
import { deletePortfolioAttachmentService } from "@/services/delete-portfolio-attachment-service";
import type { TPortfolioAttachment } from "@/types/portfolio-types";

export function Carousel(
    {
        attachments,
        id,
        callback
    }
    :
    {
        attachments: TPortfolioAttachment[],
        id: number,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
        callback: Function
    }
): ReactNode {
    const total = attachments.length + 1
    const [current, setCurrent] = useState(0)
    const [file, setFile] = useState<File | null>(null)

    async function uploadAttachment(){
        if(file){
            await uploadPortfolioAttachmentService(getSession() as string, id, file)
            setFile(null)
        }
    }

    const next = () => {
        setCurrent((prev) => (prev + 1) % total)
    }

    const prev = () => {
        setCurrent((prev) => (prev - 1 + total) % total)
    }

    useEffect(() => {
        uploadAttachment()
        callback()
    }, [file])

    return (
        <div className="relative overflow-hidden w-full ">
            <div 
                className="flex transition-transform duration-500 ease-in-out mb-4 items-center"
                style={{ transform: `translateX(-${current * 100}%)`}}
            >
                {attachments.map((v, i) => (
                    <div className="min-w-full relative">
                        <img src={`${baseUrl("/uploads/images/")}${v.imageUrl}`} alt={`Img_${i}`} className="my-5 rounded-md aspect-video object-cover" />
                        <button
                            id={`${id}`}
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 dark:bg-[#2b2b33] bg-white text-white px-3 py-1 rounded-full cursor-pointer"
                            onClick={async () => {
                                await deletePortfolioAttachmentService(getSession() as string, v.id)
                                await callback()
                            }}
                        >
                            <IoTrashOutline className="text-gray-600 dark:text-[#dfdfe4]" />
                        </button>
                    </div>
                ))}
                <div className="min-w-[100%]">
                    <DragAndDropFiles
                        file={file}
                        setFile={setFile}
                    />
                </div>
            </div>
            <button
                onClick={prev}
                className="absolute top-1/2 left-2 -translate-y-1/2 dark:bg-[#2b2b33] bg-white text-white px-3 py-1 rounded-full cursor-pointer"
            >
                <AiFillLeftCircle className="fill-gray-600 dark:fill-[#dfdfe4]" />
            </button>
            <button
                onClick={next}
                className="absolute top-1/2 right-2 -translate-y-1/2 dark:bg-[#2b2b33] bg-white text-white px-3 py-1 rounded-full cursor-pointer"
            >
                <AiFillRightCircle className="fill-gray-600 dark:fill-[#dfdfe4]" />
            </button>
        </div>
    )
}