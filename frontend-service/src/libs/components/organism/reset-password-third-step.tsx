import { InputWithError } from "../molecules/input-with-error";
import Button from "../atoms/button";
import { MdOutlineVpnKey } from "react-icons/md";
import { useContext } from "react";
import { Fctx } from "@/libs/context/forgot-password-context";

export function ResetPasswordThirdStep(
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
                <MdOutlineVpnKey  size={40} />
                <h2 className="text-2xl font-semibold mt-3">Buat Password Baru</h2>
                <h5 className="text-sm text-center">Sesuaikan password baru anda</h5>
            </div>
            <div className="mt-10 mx-2">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    callback()
                }}>
                    <InputWithError 
                        type="password"
                        label="Password Baru"
                        placeholder="XXXXXX"
                        value={fctx.password}
                        onChange={(e) => setFctx({...fctx, password: e.target.value})}
                    />
                    <Button className="mt-5 w-full">Reset Password</Button>
                </form>
            </div>
        </div>
    )
}