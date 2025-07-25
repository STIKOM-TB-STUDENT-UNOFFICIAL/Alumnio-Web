import { postAdministratorService } from "@/services/post-admin-service";
import { InputWithError } from "../molecules/input-with-error";
import { useEffect, useState, type ReactNode } from "react";
import { getSession } from "@/utils/session";
import { patchAdministratorService } from "@/services/patch-admin-service";

export function NewOrEditAdmin(
    {
        userId,
        userName,
        action,
        callback
    }:{
        userId?: number,
        userName?: string,
        action: "NEW" | "CHANGE",
        callback?: () => void
    }
)
: ReactNode
{
    const [username, setUsername] = useState("")
    const [id, setId] = useState(0)
    const [password, setPassword] = useState("")

    useEffect(() => {
        setUsername(userName ?? "")
        setId(userId ?? 0)
    }, [userName, userId])

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
        }}>
            <InputWithError 
                type="text"
                label="Username"
                placeholder="Username"
                className="mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={username.length == 0 ? "Username tidak boleh kosong" : ""}
            />
            <InputWithError 
                type="password"
                label="Password"
                placeholder="*******"
                className="mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={password.length < 8 && password.length != 0 ? "Password harus lebih dari 8 karakter" : ""}
            />
            <button 
                className="bg-blue-600 disabled:bg-blue-200 px-3 py-2 rounded-md
                          dark:bg-blue-900 text-[#f7f7f8] flex items-center gap-2
                            text-sm cursor-pointer mt-5 w-full justify-center"
                onClick={async () => {
                    if(action === "NEW"){
                        await postAdministratorService(getSession() as string, {
                            username,
                            password
                        })
                        if(callback){
                            callback()
                        }
                    }
                    else{
                        await patchAdministratorService(getSession() as string, {
                            username,
                            password,
                            userId: id
                        })
                        if(callback){
                            callback()
                        }
                    }
                    setUsername("")
                    setPassword("")
                }}
            >
                {action === "NEW" ? "Tambah" : "Ubah"}
            </button>
        </form>
    )
}