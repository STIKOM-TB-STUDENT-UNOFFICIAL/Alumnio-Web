import { AiOutlineContainer, AiOutlineDatabase } from "react-icons/ai"
import icon from "@/assets/icon.png"
import Button from "@/libs/components/atoms/button"
import { InputWithError } from "@/libs/components/molecules/input-with-error"
import { useForm } from "react-hook-form"
import { LoginSchema } from "@/schema/login-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"
import { CustomSelectWithError } from "@/libs/components/molecules/custom-select-with-error"
import { SessionRole } from "@/utils/session"
import { signInService } from "@/services/auth-service"

export default function Index(): React.ReactNode{
    const { 
        handleSubmit, 
        register, 
        formState : { errors } 
    } = useForm<z.infer<typeof LoginSchema>>({ resolver: zodResolver(LoginSchema)})

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            <div className="flex flex-col justify-center items-center min-h-[400px]">
                <img src={icon} alt="Icon" className="w-40" />
                <h1 className="text-5xl text-transparent bg-gradient-to-r from-blue-500 
                            to-blue-700 dark:from-blue-50 dark:to-blue-300 bg-clip-text font-bold"
                >Alumnio Web</h1>
                <h6 className="mt-2 max-w-[30rem] text-center text-lg font-medium">Kelola rekam jejak alumni secara digital untuk mendukung kolaborasi dan pelacakan karier yang berkelanjutan.</h6>
            </div>
            <div className="flex flex-col lg:flex-row mt-10 px-20 gap-10">
                <div className="flex flex-col justify-center gap-10">
                    <div className="flex">
                        <div className="block">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                                <AiOutlineDatabase size={40} className="fill-blue-600 dark:fill-blue-100" />
                            </div>
                        </div>
                        <div className="max-w-[70rem] mx-5">
                            <h4 className="text-xl font-semibold">Pemantauan Alumni Terpusat</h4>
                            <h6>
                                Kampus dapat memantau perkembangan karier alumni secara real-time melalui sistem yang terintegrasi dan akurat.
                            </h6>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="block">
                            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
                                <AiOutlineContainer size={40} className="fill-blue-600 dark:fill-blue-100" />
                            </div>
                        </div>
                        <div className="max-w-[70rem] mx-5">
                            <h4 className="text-xl font-semibold">Dokumentasi Karier Alumni</h4>
                            <h6>
                                Catat riwayat pekerjaan, portofolio, dan pencapaian alumni sebagai data pendukung evaluasi, akreditasi, dan pengembangan institusi.
                            </h6>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full bg-blue-50 dark:bg-[#232325] px-6 py-5 rounded-md">
                    <h2 className="text-2xl font-semibold">Selamat Datang Kembali</h2>
                    <h6 className="text-md">Masuk untuk mengakses portal alumni Anda</h6>
                    <h6 className="mt-5 mb-2">Masuk Sebagai</h6>
                    <form onSubmit={handleSubmit(signInService)}>
                        <CustomSelectWithError
                            data={[
                                {
                                    display: "Administrator",
                                    value: SessionRole.ADMINISTRATOR
                                },
                                {
                                    display: "Alumni",
                                    value: SessionRole.ALUMNI
                                }
                            ]}
                            {...register("role")}
                            error={errors.role?.message}
                        />
                        <InputWithError 
                            type="text" 
                            label="NIM atau Username"
                            className="mt-5 w-full"
                            placeholder="XXXXXX"
                            {...register("username")}
                            error={errors.username?.message}
                        />
                        <InputWithError
                            type="password"
                            label="Password"
                            className="mt-5 w-full"
                            {...register("password")}
                            error={errors.password?.message}
                        />
                        <Button className="mt-5 w-full">Sign In</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}