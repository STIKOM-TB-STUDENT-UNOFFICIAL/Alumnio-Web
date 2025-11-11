import { IoCheckmarkCircleOutline } from "react-icons/io5";
import Button from "../atoms/button";
import { useEffect, useState } from "react";

export function ResetPasswordFinalStep(){
    const [timer, setTimer] = useState(10)

    function redirect(){
        document.location.href = "/"
    }

    useEffect(() => {
        if(timer === 0){
            redirect()
        }
        setTimeout(() => {
            setTimer(timer - 1)
        }, 1000)
    }, [timer])

    return (
        <div className="bg-white dark:bg-clr-surface-tonal-a0-dark text-black dark:text-gray-200 shadow-sm p-5 rounded-lg my-5">
            <div className="flex flex-col items-center">
                <div className="p-3 dark:bg-[#2b2b33] bg-white rounded-full my-3">
                    <IoCheckmarkCircleOutline  size={40} />
                </div>
                <h2 className="text-2xl font-semibold mt-3 text-center">Berhasil Mereset Password</h2>
                <h5 className="text-sm text-center">Password anda telah berhasil direset, silahkan login</h5>
                <div className="p-3 dark:bg-clr-surface-tonal-a10-dark bg-white rounded-full my-8">
                    <IoCheckmarkCircleOutline size={80} color="#46d27b" />
                </div>
                <h2 className="text-2xl text-center font-semibold text-[#46d27b]">Password Reset Complete !</h2>
                <h4 className="text-center text-sm">Password anda telah berhasil diperbarui. Anda dapat login dengan password baru anda</h4>
                <div className="p-3 dark:bg-clr-surface-tonal-a10-dark bg-white rounded-lg w-full my-8 text-center text-sm">
                    Redirecting to login page in {timer} seconds
                </div>
                <Button 
                    className="w-full"
                    onClick={() => {
                        redirect()
                    }}
                >
                    Go To Login Now
                </Button>
            </div>
            
        </div>
    )
}