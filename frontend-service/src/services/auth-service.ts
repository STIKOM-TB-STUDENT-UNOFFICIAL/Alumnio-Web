import { type TAuth, type TAuthentication, type TResetPassword, type TResetPasswordResponse, type TValidation } from "@/types/auth-types"
import { baseUrl } from "@/utils/base-url"
import { fetchJson } from "@/utils/fetch-json"
import { getSession, sessionDestroy, SessionRole, setSession } from "@/utils/session"
import { toast } from "sonner"

export async function validationSession(token: string){
    try{
        const sessionValidator = await fetchJson<TValidation, undefined>(
            baseUrl("/auth"), 
            "GET", {
                "Authorization": `Bearer ${token}`
            }
        )
        if(typeof(sessionValidator.success) == "boolean"){
            return false
        }
        if(sessionValidator.meta.status != "SUCCESS"){
            return false
        }
        return sessionValidator.data
    }
    catch(e){
        console.log(e)
        return false
    }
}

export async function signInService(authData: TAuth){
    try{
        const auth = await fetchJson<TAuthentication, TAuth>(baseUrl("/auth"), "POST", {"Content-Type": "application/json"}, authData)
        if(typeof(auth.success) == "boolean"){
            throw new Error()
        }
        if(auth.meta.status == "FAILED"){
            throw new Error()
        }
        setSession(auth.data.token)
        toast("Berhasil Login")
        document.location.href = (authData.role == SessionRole.ADMINISTRATOR ? "/admin/dashboard" : "/alumni/dashboard")
    }
    catch{
        toast("Gagal login")
    }
}

export async function newPasswordService(password: TResetPassword){
    try{
        const auth = await fetchJson<TResetPasswordResponse, TResetPassword>(
            baseUrl("/auth"), 
            "PATCH", 
            {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getSession()}`
            }, 
            password
        )
        if(typeof(auth.success) == "boolean"){
            throw new Error()
        }
        if(auth.meta.status == "FAILED"){
            throw new Error()
        }
        toast("Berhasil Mengganti Password")
    }
    catch (e){
        toast("Gagal Mengganti Password")
        console.log(e)
    }
}


export async function logOutService(){
    sessionDestroy()
    document.location.href = "/"
}