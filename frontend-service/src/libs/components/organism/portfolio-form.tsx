import { useState, type ReactNode } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { Carousel, type TAttachments } from "../molecules/carousel";
import { InputWithError } from "../molecules/input-with-error";

export function PortfolioForm(): ReactNode {
    const [portfolio] = useState([
        {
            id: 1,
            title: "Juara Satu Malas Ngoding",
            description: "Juara satu malas ngoding tingkat indonesia",
            demoUrl: "",
            PortfolioAttachment: [
                {
                    id:2,
                    imageUrl: "https://smansaka.sch.id/po-content/uploads/whatsapp_image_2023-03-09_at_09.16.45.jpg"
                },
                {
                    id: 1,
                    imageUrl: "https://akcdn.detik.net.id/community/media/visual/2023/07/29/ragam-karakter-cosplay-ramaikan-festival-jepang-di-istora-senayan-5_169.jpeg?w=700&q=90"
                }
            ]
        },
        {
            id: 1,
            title: "Juara Satu Malas Ngoding",
            description: "Juara satu malas ngoding tingkat indonesia",
            demoUrl: "",
            PortfolioAttachment: [
                {
                    id:2,
                    imageUrl: "https://smansaka.sch.id/po-content/uploads/whatsapp_image_2023-03-09_at_09.16.45.jpg"
                },
                {
                    id: 1,
                    imageUrl: "https://akcdn.detik.net.id/community/media/visual/2023/07/29/ragam-karakter-cosplay-ramaikan-festival-jepang-di-istora-senayan-5_169.jpeg?w=700&q=90"
                }
            ]
        }
    ])

    return (
        <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
            <div className="flex justify-between items-center">
                <div className="block">
                    <h4 className="text-2xl font-semibold">Portofolio</h4>
                    <h6 className="text-sm">Arsipkan Portofolio dan Pencapaian anda</h6>
                </div>
                <button className="dark:bg-blue-900 bg-blue-400 px-4 py-1 rounded-lg cursor-pointer my-5 flex justify-center items-center gap-3">
                    <AiOutlineFileAdd />
                    Tambah Portofolio
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-2">
                {portfolio.map((v, i) => (
                    <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
                        <div className="w-full flex justify-between items-center">
                            <h5 className="border dark:border-[#232325] border-blue-50 px-2 py-1 rounded-lg text-sm mb-4">
                                Portfolio #{i + 1}
                            </h5>
                            <button className="cursor-pointer">
                                <IoTrashOutline />
                            </button>
                        </div>
                        <Carousel attachments={v.PortfolioAttachment as TAttachments[]} id={v.id} />
                        <InputWithError type="text" value={v.title} label="Project Title"/>
                        <InputWithError type="text" value={v.description} label="Description"/>
                        <InputWithError type="text" value={v.demoUrl} label="Project Link"/>
                    </div>
                ))}
            </div>
        </div>
    )
}