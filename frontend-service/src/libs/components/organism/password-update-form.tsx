import { InputWithError } from "../molecules/input-with-error";

export function PasswordUpdateForm(){
    return (
        <>
            <h4 className="text-2xl font-semibold">Password</h4>
            <h6 className="text-sm">Ubah password anda</h6>
            <form>
                <InputWithError 
                    type={"password"}
                    label="Password Baru"
                    className="mt-4"
                />
                <button className="dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer my-5 ">
                    Perbarui
                </button>
            </form>
        </>
    )
}