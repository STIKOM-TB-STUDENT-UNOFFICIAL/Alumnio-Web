export async function fetchJson<T, Q>(url: string, method: string, body?: Q): Promise<T | Error> {
    try{
        const res = await fetch(url, {
            method,
            body: JSON.stringify(body)
        })

        return await res.json() as T
    }
    catch(e: unknown){
        return e as Error
    }
}