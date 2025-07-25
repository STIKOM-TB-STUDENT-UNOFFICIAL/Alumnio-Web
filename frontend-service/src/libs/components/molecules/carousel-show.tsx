import { useState, type ReactNode } from "react";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { baseUrl } from "@/utils/base-url";
import type { TPortfolioAttachment } from "@/types/portfolio-types";

export function CarouselShow(
    {
        attachments
    }
    :
    {
        attachments: TPortfolioAttachment[]
    }
): ReactNode {
    const total = attachments.length
    const [current, setCurrent] = useState(0)

    const next = () => {
        setCurrent((prev) => (prev + 1) % total)
    }

    const prev = () => {
        setCurrent((prev) => (prev - 1 + total) % total)
    }

    return (
        <div className="relative overflow-hidden w-full ">
            <div 
                className="flex transition-transform duration-500 ease-in-out mb-4 items-center"
                style={{ transform: `translateX(-${current * 100}%)`}}
            >
                {attachments.map((v, i) => (
                    <div className="min-w-full relative">
                        <img 
                            src={`${baseUrl("/uploads/images/")}${v.imageUrl}`} 
                            alt={`Img_${i}`} 
                            className="rounded-md max-w-full max-h-full object-contain aspect-[16/9]"
                        />
                    </div>
                ))}
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