import Button from "@/libs/components/atoms/button";
import { Input } from "@/libs/components/atoms/input";
import JobCard from "@/libs/components/molecules/job-card";
import { JobSearch } from "@/libs/components/molecules/job-search";
import { Modals } from "@/libs/components/molecules/modals";
import { deleteJobOpportunityService } from "@/services/delete-job-opportunity";
import { loadJobOpportunityService } from "@/services/load-job-opportunity-service";
import { patchJobOpportunityService } from "@/services/patch-job-opportunity-service";
import { postJobOpportunityService } from "@/services/post-job-opportunity-service";
import type { JobType } from "@/types/job-types";
import { getSession } from "@/utils/session";
import { useEffect, useState, type ReactNode } from "react";
import { MdOutlineDomainAdd } from "react-icons/md";
import { toast } from "sonner";

export default function Index(): ReactNode {
    const [ job, setJob ] = useState<JobType[]>([])
    const [ q, setQ ] = useState<string>("")
    const [ showInsertModals, setShowInsertModals ] = useState<boolean>(false)
    const [ showUpdateModals, setShowUpdateModals ] = useState<boolean>(false)
    const [ inputJob, setInputJob ] = useState<JobType>({
        id: -1,
        title: "",
        company: "",
        companyLogo: "",
        location: "",
        postedDate: "",
        dueDate: "",
        mailContact: "",
        phoneContact: "",
        description: "",
        salary: ""
    })
    const [ updateJob, setUpdateJob ] = useState<JobType>()
    const [ selectedIdx, setSelectedIdx ] = useState<number>(-1)
    const [ showDelete, setShowDelete ] = useState(false)

    async function loadJob(){
        const jobOpportunity = await loadJobOpportunityService(getSession() as string, q)
        if(jobOpportunity){
            setJob(jobOpportunity)
        }
    }

    useEffect(() => {
        loadJob()
    }, [])

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full py-10">
            <Modals 
                show={showInsertModals} 
                control={setShowInsertModals}
                title="Tambah Lowongan Pekerjaan"
            >
                <div className="max-h-[80vh] md:min-w-[40rem] lg:min-w-[60rem] md:max-w-[40rem] lg:max-w-[60rem] overflow-y-auto px-1">
                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        if(
                            inputJob.title == "" ||
                            inputJob.company == "" ||
                            inputJob.salary == "0" || inputJob.salary == "" ||
                            inputJob.location == "" ||
                            inputJob.mailContact == "" ||
                            inputJob.phoneContact == "" ||
                            inputJob.dueDate == "" ||
                            inputJob.description == ""
                        ){
                            toast("Anda belum mengisi seluruh form")
                            return
                        }
                        await postJobOpportunityService(getSession() as string, inputJob)
                        setInputJob({
                            id: -1,
                            title: "",
                            company: "",
                            companyLogo: "",
                            location: "",
                            postedDate: "",
                            dueDate: "",
                            mailContact: "",
                            phoneContact: "",
                            description: "",
                            salary: ""
                        })
                        setShowInsertModals(false)
                        loadJob()
                    }}>
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={inputJob.title}
                            onChange={(e) => {
                                const temp = {...inputJob}
                                temp.title = e.target.value
                                setInputJob(temp)
                            }}
                            label="Posisi" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={inputJob.company}
                            onChange={(e) => {
                                const temp = {...inputJob}
                                temp.company = e.target.value
                                setInputJob(temp)
                            }}
                            label="Perusahaan" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={parseInt(inputJob.salary || "0").toString()}
                            onChange={(e) => {
                                const temp = {...inputJob}
                                temp.salary = parseInt(e.target.value || "0").toString()
                                setInputJob(temp)
                            }}
                            label="Gaji" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={inputJob.location}
                            onChange={(e) => {
                                const temp = {...inputJob}
                                temp.location = e.target.value
                                setInputJob(temp)
                            }}
                            label="Lokasi" />
                        <Input 
                            className="mb-1" 
                            type="email"
                            value={inputJob.mailContact}
                            onChange={(e) => {
                                const temp = {...inputJob}
                                temp.mailContact = e.target.value
                                setInputJob(temp)
                            }}
                            label="Email" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={inputJob.phoneContact}
                            onChange={(e) => {
                                const temp = {...inputJob}
                                temp.phoneContact = e.target.value
                                setInputJob(temp)
                            }}
                            label="Telp" />
                        <Input
                          className="mb-1"
                          type="date"
                          value={inputJob.dueDate ? inputJob.dueDate.slice(0, 10) : ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const temp = { ...inputJob };
                            temp.dueDate = value ? new Date(value).toISOString() : "";
                            setInputJob(temp);
                          }}
                          label="Batas Akhir"
                        />
                        <Input
                            className="mb-1" 
                            type="textarea"
                            value={inputJob.description}
                            onChange={(e) => {
                                const temp = {...inputJob}
                                temp.description = e.target.value
                                setInputJob(temp)
                            }}
                            label="Deskripsi" />
                        <Button className="w-full" btntype="success">
                            Tambah
                        </Button>
                    </form>
                </div>
            </Modals>
            <Modals 
                show={showUpdateModals} 
                control={setShowUpdateModals}
                title="Edit Lowongan Pekerjaan"
            >
                <div className="max-h-[80vh] md:min-w-[40rem] lg:min-w-[60rem] md:max-w-[40rem] lg:max-w-[60rem] overflow-y-auto px-1">
                    <form onSubmit={async (e) => {
                        e.preventDefault()
                        if(
                            updateJob?.title == "" ||
                            updateJob?.company == "" ||
                            updateJob?.salary == "0" || updateJob?.salary == "" ||
                            updateJob?.location == "" ||
                            updateJob?.mailContact == "" ||
                            updateJob?.phoneContact == "" ||
                            updateJob?.dueDate == "" ||
                            updateJob?.description == ""
                        ){
                            toast("Anda belum mengisi seluruh form")
                            return
                        }
                        await patchJobOpportunityService(getSession() as string, updateJob as JobType)
                        setUpdateJob({
                            id: -1,
                            title: "",
                            company: "",
                            companyLogo: "",
                            location: "",
                            postedDate: "",
                            dueDate: "",
                            mailContact: "",
                            phoneContact: "",
                            description: "",
                            salary: ""
                        })
                        setShowUpdateModals(false)
                        loadJob()
                    }}>
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={updateJob?.title}
                            onChange={(e) => {
                                const temp = {...(updateJob as JobType)}
                                temp.title = e.target.value
                                setUpdateJob(temp)
                            }}
                            label="Posisi" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={updateJob?.company}
                            onChange={(e) => {
                                const temp = {...(updateJob as JobType)}
                                temp.company = e.target.value
                                setUpdateJob(temp)
                            }}
                            label="Perusahaan" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={parseInt(updateJob?.salary || "0").toString()}
                            onChange={(e) => {
                                const temp = {...(updateJob as JobType)}
                                temp.salary = parseInt(e.target.value || "0").toString()
                                setUpdateJob(temp)
                            }}
                            label="Gaji" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={updateJob?.location}
                            onChange={(e) => {
                                const temp = {...(updateJob as JobType)}
                                temp.location = e.target.value
                                setUpdateJob(temp)
                            }}
                            label="Lokasi" />
                        <Input 
                            className="mb-1" 
                            type="email"
                            value={updateJob?.mailContact}
                            onChange={(e) => {
                                const temp = {...(updateJob as JobType)}
                                temp.mailContact = e.target.value
                                setUpdateJob(temp)
                            }}
                            label="Email" />
                        <Input 
                            className="mb-1" 
                            type="text"
                            value={updateJob?.phoneContact}
                            onChange={(e) => {
                                const temp = {...(updateJob as JobType)}
                                temp.phoneContact = e.target.value
                                setUpdateJob(temp)
                            }}
                            label="Telp" />
                        <Input
                          className="mb-1"
                          type="date"
                          value={updateJob?.dueDate ? updateJob?.dueDate.slice(0, 10) : ""}
                          onChange={(e) => {
                            const value = e.target.value;
                            const temp = {...(updateJob as JobType)}
                            temp.dueDate = value ? new Date(value).toISOString() : "";
                            setUpdateJob(temp);
                          }}
                          label="Batas Akhir"
                        />
                        <Input
                            className="mb-1" 
                            type="textarea"
                            value={updateJob?.description}
                            onChange={(e) => {
                                const temp = {...(updateJob as JobType)}
                                temp.description = e.target.value
                                setUpdateJob(temp)
                            }}
                            label="Deskripsi" />
                        <Button className="w-full" btntype="success">
                            Tambah
                        </Button>
                    </form>
                </div>
            </Modals>
            <Modals show={showDelete} control={setShowDelete} title="Hapus loker ini ?">
                <div className="flex justify-end gap-2">
                    <Button btntype="danger" onClick={async () => {
                        await deleteJobOpportunityService(getSession() as string, selectedIdx)
                        await loadJob()
                        setShowDelete(false)
                    }}>Ya</Button>
                    <Button 
                        onClick={() => {
                            setShowDelete(false)
                        }}
                    >Tidak</Button>
                </div>
            </Modals>
            <div
                className="w-full bg-white dark:bg-[#1e293b] 
                rounded-lg overflow-hidden shadow-sm
                px-10 py-10 gap-10"
            >
                <h3 className="text-3xl font-bold mb-5">Lowongan Pekerjaan</h3>
                <JobSearch q={q} setQ={setQ} btnAction={loadJob}/>
                <Button btntype="success" onClick={() => setShowInsertModals(true)}>
                    <MdOutlineDomainAdd />
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-flow-row-dense gap-x-5 items-start">
                {job.map((v) => (
                    <JobCard 
                        job={v}
                        mode="ADMINISTRATOR"
                        setSelectedIdx={setSelectedIdx}
                        setShowDelete={setShowDelete}
                        setShowEdit={setShowUpdateModals}
                        setUpdateJob={setUpdateJob as React.Dispatch<React.SetStateAction<JobType>>}
                    />
                ))}
            </div>
        </div>
    )
}