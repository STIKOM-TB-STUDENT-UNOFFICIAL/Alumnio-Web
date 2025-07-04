export async function fetchJson<T, Q>(url: string, method: string, headers?: object, body?: Q): Promise<T> {
    try{
        const res = await fetch(url, {
            method,
            body: body ? JSON.stringify(body ?? "") : undefined,
            headers: {
                ...headers
            }
        })

        return await res.json() as T
    }
    catch(e: unknown){
        throw e as Error
    }
}