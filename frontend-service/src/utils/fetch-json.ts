function resolveBody(body: unknown): BodyInit | undefined {
  if (body instanceof FormData) return body
  if (body === undefined || body === null) return undefined
  return JSON.stringify(body)
}

export async function fetchJson<T, Q>(url: string, method: string, headers?: object, body?: Q): Promise<T> {
    try{
        const res = await fetch(url, {
            method,
            body: resolveBody(body),
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