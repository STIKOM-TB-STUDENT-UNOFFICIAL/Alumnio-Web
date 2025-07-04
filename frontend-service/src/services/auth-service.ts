import { type TAuth, type TAuthentication, type TValidation } from "@/types/auth-types"
import { baseUrl } from "@/utils/base-url"
import { fetchJson } from "@/utils/fetch-json"
import { sessionDestroy, SessionRole, setSession } from "@/utils/session"
import { toast } from "sonner"

export async function validationSession(token: string){
    try{
        const sessionValidator = await fetchJson<TValidation, undefined>(
            baseUrl("/auth"), 
            "GET", {
                "Authorization": `Bearer ${token}`
            }
        )
        console.log(sessionValidator)
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
        console.log(auth)
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

export async function logOutService(){
    sessionDestroy()
    document.location.href = "/"
}