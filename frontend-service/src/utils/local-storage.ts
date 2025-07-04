export function setLocalStorageValue(key: string, value: string){
    localStorage.setItem(key, value)
}

export function getLocalStorageValue(key: string) : string | boolean{
    return localStorage.getItem(key) ?? false
}

export function destroyLocalStorageValue(key: string) {
    localStorage.removeItem(key)
}