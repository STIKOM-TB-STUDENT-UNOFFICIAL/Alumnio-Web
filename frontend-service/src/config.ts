const defaultPort = import.meta.env.VITE_MODE == "production" ? null : 4000

export const BACKEND_CONFIG = {
    protocol: import.meta.env.VITE_PROTOCOL ?? "http",
    host: import.meta.env.VITE_HOST ?? "localhost",
    port: import.meta.env.VITE_PORT ?? (defaultPort == null ? undefined : defaultPort)
}