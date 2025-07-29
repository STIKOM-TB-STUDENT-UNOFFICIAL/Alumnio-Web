function resolveBody(body: unknown): BodyInit | undefined {
    if (body instanceof FormData) return body;
    if (body === undefined || body === null) return undefined;
    return JSON.stringify(body);
}

export async function fetchJson<T, Q>(
    url: string,
    method: string,
    headers?: object,
    body?: Q
): Promise<T> {
    const res = await fetch(url, {
        method,
        body: resolveBody(body),
        headers: {
            ...headers,
        },
    });

    if (!res.ok) {
        let errorMessage = `HTTP error! Status: ${res.status}`;

        try {
            const errorBody = await res.json();
            if(errorBody.success === false){
                errorMessage = "Format tidak valid"
            }
            errorMessage = errorBody.meta.message;
        } catch {
            console.log("Failed parsing json error")
        }

        throw new Error(errorMessage);
    }

    return (await res.json()) as T;
}
