import { ResetPasswordFinalStep } from "@/libs/components/organism/reset-password-final-step";
import { ResetPasswordFirstStep } from "@/libs/components/organism/reset-password-first-step";
import { ResetPasswordSecondStep } from "@/libs/components/organism/reset-password-second-step";
import { ResetPasswordThirdStep } from "@/libs/components/organism/reset-password-third-step";
import { Fctx } from "@/libs/context/forgot-password-context";
import { requestOTPService } from "@/services/request-otp-service";
import { resetPasswordService } from "@/services/reset-password-service";
import { validateOTPService } from "@/services/validate-otp-service";
import type { TFctx } from "@/types/forgot-types";
import { getSession } from "@/utils/session";
import { useState, type ReactNode } from "react";
import { AiFillLeftCircle } from "react-icons/ai";
import { toast } from "sonner";

export default function Index(): ReactNode {
    const [fctx, setFctx] = useState({
        username: "",
        email: "",
        otp: "",
        password: ""
    } as TFctx)
    const [step, setStep] = useState(1)
    
    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full flex flex-col items-center">
            <div className="my-10 p-4 w-full md:w-[400px]">
                <a href="/" className="flex items-center gap-2 my-2">
                    <AiFillLeftCircle />
                    Back to login
                </a>
                <Fctx.Provider value={{fctx, setFctx}}>
                    {step === 1 ? (
                        <ResetPasswordFirstStep callback={async () => {
                            const res = await requestOTPService(getSession() as string, { 
                                username: fctx.username,
                                email: fctx.email
                            })
                            if(res == "OTP Telah Terkirim"){
                                setStep(2)
                                toast("Berhasil Mengirim OTP, Cek Email Anda")
                            }
                            else if(res == "OTP masih aktif. Coba lagi nanti."){
                                setStep(2)
                                toast("Berhasil Mengirim OTP, Cek Email Anda")
                            }
                            else{
                                toast(res)
                            }
                        }} />
                    ) : 
                    step === 2 ? (
                        <ResetPasswordSecondStep callback={async () => {
                            const res = await validateOTPService(getSession() as string, { 
                                username: fctx.username,
                                email: fctx.email,
                                otp: fctx.otp
                            })
                            if(res == "OTP Telah Terverifikasi"){
                                setStep(3)
                            }
                            else if(res == "INVALID OTP"){
                                toast("OTP Tidak Valid, Mohon Kirim Ulang OTP")
                                setStep(1)
                            }
                            else{
                                toast(res)
                            }
                        }} />
                    ) : 
                    step === 3 ? (
                        <ResetPasswordThirdStep callback={async () => {
                            const res = await resetPasswordService(getSession() as string, { 
                                username: fctx.username,
                                email: fctx.email,
                                otp: fctx.otp,
                                newPassword: fctx.password
                            })
                            if(res == "Password telah berhasil diubah"){
                                setStep(4)
                            }
                            else if(res == "OTP tidak valid atau sudah kadaluarsa."){
                                toast("OTP Tidak Valid, Mohon Kirim Ulang OTP")
                                setStep(1)
                            }
                            else{
                                toast(res)
                            }
                        }} />
                    ) : (<ResetPasswordFinalStep />)}

                </Fctx.Provider>
            </div>
        </div>
    )
}