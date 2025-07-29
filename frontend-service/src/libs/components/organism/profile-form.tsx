import { useEffect, useState, type ReactNode } from "react";
import profilepict from "@/assets/default-user.png"
import { InputWithError } from "../molecules/input-with-error";
import { loadProfileService } from "@/services/load-profile-service";
import { getSession } from "@/utils/session";
import type { TUserProfile } from "@/types/user-profile-types";
import { useForm, Controller } from "react-hook-form";
import { UserProfileSchema } from "@/schema/user-profile-schema";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { patchProfileService } from "@/services/patch-profile-service";
import { PasswordUpdateForm } from "./password-update-form";
import { Modals } from "../molecules/modals";
import { ProfilePictUploads } from "./profile-pict-uploads";
import { baseUrl } from "@/utils/base-url";

export function ProfileForm(): ReactNode {
    const [ profile, setProfile ] = useState<TUserProfile>({
        fullname: "",
        email: "",
        phone: "",
        address: "",
        bio: "",
        linkedinUrl: "",
        profilePict: ""
    })
    const [ load, setLoad ] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        control
    } = useForm<z.infer<typeof UserProfileSchema>>({ resolver: zodResolver(UserProfileSchema) })

    useEffect(() => {
        const userProfile = loadProfileService(getSession() as string)
        userProfile.then((v) => {
            setProfile({
                ...(v as TUserProfile)
            })
        })
    }, [])

    useEffect(() => {
        reset(profile)
    }, [profile, reset])
    
    return (
        <div className="w-full border dark:border-[#232325] border-blue-50 p-5 rounded-lg my-5">
            <Modals 
                show={modalShow} 
                control={setModalShow}
                title="Upload Profile Pict"
            >
                <ProfilePictUploads 
                    control={setModalShow}
                    callback={() => {
                        const userProfile = loadProfileService(getSession() as string)
                        userProfile.then((v) => {
                            setProfile({
                                ...(v as TUserProfile)
                            })
                        })
                    }}
                />
            </Modals>
            <h4 className="text-2xl font-semibold">Informasi Pribadi</h4>
            <h6 className="text-sm">Ubah informasi pribadi anda</h6>
            <div className="flex items-center">
                <img 
                    src={
                        profile.profilePict ? 
                        profile.profilePict != "" ? 
                        baseUrl(`/uploads/images/${profile.profilePict}`)  : 
                        profilepict : 
                        profilepict
                    }
                    alt="Profile Pict"
                    className="w-[100px] h-[100px] rounded-full my-5 object-cover"
                    style={{
                        imageRendering: "auto"
                    }}
                />
                <button 
                    className="border dark:border-[#232325] border-blue-50 p-3 rounded-lg cursor-pointer mx-4 dark:hover:bg-[#232325] hover:bg-blue-50"
                    onClick={() => setModalShow(true)}
                >
                    Ubah Gambar
                </button>
            </div>
            <form onSubmit={handleSubmit(async (v) => {
                console.log(v)
                setLoad(true)
                await patchProfileService(getSession() as string, v)
                setLoad(false)
            })}>
                <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-5">
                    <InputWithError 
                        type={"text"} 
                        label="Full Name"
                        error={errors.fullname?.message}
                        {...register("fullname")}
                        />
                    <InputWithError 
                        type={"email"} 
                        label="Email (Mohon email yang valid agar dapat dihubungi)" 
                        error={errors.email?.message}
                        {...register("email")}
                        />
                    <InputWithError
                        type={"text"}
                        label="Phone"
                        error={errors.phone?.message}
                        {...register("phone")}
                        />
                    <InputWithError 
                        type={"text"}
                        label="Address"
                        {...register("address")}
                    />
                    <InputWithError 
                        type={"text"} 
                        label="Linkedin (Optional)"
                        {...register("linkedinUrl")}
                    />
                </div>
                <Controller
                    control={control}
                    name="bio"
                    defaultValue=""
                    render={({ field }) => (
                        <InputWithError 
                            type="textarea"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            label="Bio"
                            name="bio"
                            className="mt-4"
                        />
                    )}
                />
                <button className="dark:bg-blue-900 bg-blue-400 p-3 rounded-lg cursor-pointer my-5 " disabled={load}>
                    Perbarui
                </button>
            </form>
            <PasswordUpdateForm />
        </div>
    )
}