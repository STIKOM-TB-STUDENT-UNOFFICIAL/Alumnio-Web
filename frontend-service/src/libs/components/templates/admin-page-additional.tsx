import { AiOutlineAudit, AiOutlineExport, AiOutlineFileSearch, AiOutlineReconciliation } from "react-icons/ai";

export function AdminPageAdditional(){
    return (
        <>
            <div className="flex justify-between">
                <div className="block">
                    <h3 className="text-3xl font-bold">Menu lainnya</h3>
                    <h6 className="text-sm font-medium">Jelajahi menu lainnya</h6>
                </div>
            </div>
            <div className="w-full sm:flex bg-gray-50 dark:bg-slate-700 my-5 p-5 rounded-md shadow-xs">
                <AiOutlineReconciliation size={75} />
                <div className="sm:mx-5">
                    <h2 className="font-bold">Survey Alumni</h2>
                    <div className="flex mt-2">
                        <a href="/admin/survey" 
                            target="blank"
                            className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                        dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                                        text-sm"
                        >
                            Buka
                            <AiOutlineExport />
                        </a>
                    </div>
                    
                </div>
            </div>
            <div className="w-full sm:flex bg-gray-50 dark:bg-slate-700 my-5 p-5 rounded-md shadow-xs">
                <AiOutlineAudit size={75} />
                <div className="sm:mx-5">
                    <h2 className="font-bold">Survey Pengguna Lulusan</h2>
                    <div className="flex mt-2">
                        <a href="/admin/survey-pengguna-lulusan" 
                            target="blank"
                            className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                        dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                                        text-sm"
                        >
                            Buka
                            <AiOutlineExport />
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full sm:flex bg-gray-50 dark:bg-slate-700 my-5 p-5 rounded-md shadow-xs">
                <AiOutlineFileSearch size={75} />
                <div className="sm:mx-5">
                    <h2 className="font-bold">Lowongan Pekerjaan</h2>
                    <div className="flex mt-2">
                        <a href="/admin/survey" 
                            target="blank"
                            className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                                        dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                                        text-sm"
                        >
                            Buka
                            <AiOutlineExport />
                        </a>
                    </div>
                    
                </div>
            </div>
        </>
    )
}