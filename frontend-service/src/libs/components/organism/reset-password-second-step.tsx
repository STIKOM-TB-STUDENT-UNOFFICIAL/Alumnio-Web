import { InputWithError } from "../molecules/input-with-error";
import Button from "../atoms/button";
import { IoShield } from "react-icons/io5";
import { useContext } from "react";
import { Fctx } from "@/libs/context/forgot-password-context";

export function ResetPasswordSecondStep(
    {
        callback
    }
    :
    {
        callback: () => void
    }
){
    const { fctx, setFctx } = useContext(Fctx)

    return (
        <div className="w-full border dark:border-[#313139] border-blue-50 rounded-lg px-4 py-5 bg-blue-50 dark:bg-[#232325]">
            <div className="flex flex-col items-center">
                <IoShield size={40} />
                <h2 className="text-2xl font-semibold mt-3 text-center">Masukkan Kode OTP</h2>
                <h5 className="text-sm text-center">Kami telah mengirimkan kode OTP ke {fctx.email}</h5>
            </div>
            <div className="mt-10 mx-2">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    callback()
                }}>
                    <InputWithError 
                        type="text"
                        label="OTP"
                        placeholder="XXXXXX"
                        maxLength={6}
                        value={(fctx.otp === "0" ? "" : fctx.otp)}
                        onChange={(e) => setFctx({...fctx, otp: (isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)).toString()})}
                    />
                    <Button className="mt-5 w-full">Verifikasi</Button>
                </form>
            </div>
        </div>
    )
}