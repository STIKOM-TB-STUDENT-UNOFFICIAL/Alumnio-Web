import { AiOutlineMail } from "react-icons/ai";
import { InputWithError } from "../molecules/input-with-error";
import Button from "../atoms/button";
import { useContext } from "react";
import { Fctx } from "@/libs/context/forgot-password-context";

export function ResetPasswordFirstStep(
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
        <div className="bg-white dark:bg-clr-surface-tonal-a0-dark text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <div className="flex flex-col items-center">
                <AiOutlineMail size={40} />
                <h2 className="text-2xl font-semibold mt-3 text-center">Verifikasi Identitas Anda</h2>
                <h5 className="text-sm text-center">Masukkan NIM dan Email anda</h5>
            </div>
            <div className="mt-10 mx-2">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    callback()
                }}>
                    <InputWithError 
                        type="text"
                        label="NIM"
                        className="mb-2"
                        value={fctx.username}
                        onChange={(e) => setFctx({...fctx, username: e.target.value})}
                    />
                    <InputWithError 
                        type="email"
                        label="Email"
                        value={fctx.email}
                        onChange={(e) => setFctx({...fctx, email: e.target.value})}
                    />
                    <Button className="mt-5 w-full">Kirim Kode Verifikasi</Button>
                </form>
            </div>
        </div>
    )
}