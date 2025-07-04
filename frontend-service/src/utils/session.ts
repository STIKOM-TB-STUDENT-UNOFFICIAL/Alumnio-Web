import { destroyLocalStorageValue, getLocalStorageValue, setLocalStorageValue } from "./local-storage";

export const SessionRole = {
    ADMINISTRATOR: 0,
    ALUMNI: 1
}

export function setSession(token: string){
    setLocalStorageValue("token", token)
}

export function getSession(){
    return getLocalStorageValue("token")
}

export function sessionDestroy(){
    destroyLocalStorageValue("token")
}