import type z from "zod";
import { InputWithError } from "../molecules/input-with-error";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordService } from "@/services/auth-service";

export function PasswordUpdateForm(){
    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm<z.infer<typeof NewPasswordSchema>>({resolver: zodResolver(NewPasswordSchema)})

    return (
        <>
            <h4 className="text-2xl font-semibold">Password</h4>
            <h6 className="text-sm">Ubah password anda</h6>
            <form onSubmit={handleSubmit((e) => {
                    newPasswordService(e)
                    reset()
                })}>
                <InputWithError 
                    type={"password"}
                    label="Password Baru"
                    className="mt-4"
                    {...register("password")}
                    error={errors.password?.message}
                />
                <button className="dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer my-5 ">
                    Perbarui
                </button>
            </form>
        </>
    )
}