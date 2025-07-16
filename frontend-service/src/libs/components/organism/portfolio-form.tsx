import { useEffect, useState, type ReactNode } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { IoTrashOutline } from "react-icons/io5";
import { Carousel } from "../molecules/carousel";
import { InputWithError } from "../molecules/input-with-error";
import type { TPortfolio, TPortfolioAttachment } from "@/types/portfolio-types";
import { loadPortfolioService } from "@/services/load-portfolio-service";
import { getSession } from "@/utils/session";
import { savePortfolioService } from "@/services/save-portfolio-service";
import { postPortfolio } from "@/services/post-portfolio-service";
import { deletePortfolio } from "@/services/delete-portfolio-service";

export function PortfolioForm(): ReactNode {
    const [ portfolio, setPortfolio ] = useState<TPortfolio[]>([])

    async function loadPorfolio(){
        const portfolio_ = await loadPortfolioService(getSession() as string)
        if(portfolio_){
            setPortfolio(portfolio_)
        }
    }

    useEffect(() => {
        loadPorfolio()
    }, [])

    return (
        <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
            <div className="flex justify-between items-center">
                <div className="block">
                    <h4 className="text-2xl font-semibold">Portofolio</h4>
                    <h6 className="text-sm">Arsipkan Portofolio dan Pencapaian anda</h6>
                </div>
                <button
                    className="dark:bg-blue-900 bg-blue-400 px-4 py-1 rounded-lg cursor-pointer my-5 flex justify-center items-center gap-3"
                    onClick={async () => {
                        await postPortfolio(getSession() as string)
                        await loadPorfolio()
                    }}
                >
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
                            <button 
                                className="cursor-pointer"
                                onClick={async () => {
                                    await deletePortfolio(getSession() as string, v.id as number)
                                    await loadPorfolio()
                                }}
                            >
                                <IoTrashOutline />
                            </button>
                        </div>
                        <Carousel attachments={v.PortfolioAttachment as TPortfolioAttachment[]} id={v.id ?? -1} callback={loadPorfolio} />
                        <InputWithError
                            type="text" 
                            value={v.title} 
                            label="Project Title"
                            onChange={(e) => {
                                const portfolioTemp = [...portfolio]
                                portfolioTemp[i].title = e.target.value
                                setPortfolio(portfolioTemp)
                            }}
                        />
                        <InputWithError
                            type="text"
                            value={v.description}
                            label="Description"
                            onChange={(e) => {
                                const portfolioTemp = [...portfolio]
                                portfolioTemp[i].description = e.target.value
                                setPortfolio(portfolioTemp)
                            }}
                        />
                        <InputWithError
                            type="text"
                            value={v.demoUrl}
                            label="Project Link"
                            onChange={(e) => {
                                const portfolioTemp = [...portfolio]
                                portfolioTemp[i].demoUrl = e.target.value
                                setPortfolio(portfolioTemp)
                            }}
                        />
                        <button
                            className="dark:bg-blue-900 bg-blue-400 px-4 py-1 rounded-lg cursor-pointer my-5 flex justify-center items-center gap-3 w-full"
                            onClick={() => {
                                savePortfolioService(getSession() as string, {
                                    ...portfolio[i]
                                })
                                loadPorfolio()
                            }}
                        >
                            Simpan
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}