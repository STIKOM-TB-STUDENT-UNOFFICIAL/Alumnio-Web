import { z } from "zod"

export const LoginSchema = z.object({
    role: z.number({
        required_error: "Silahkan pilih role terlebih dahulu"
    }),
    username: z.string({
        required_error: "Masukkan NIM atau Username terlebih dahulu"
    }).min(1, "Masukkan NIM atau Username terlebih dahulu"),
    password: z.string({
        required_error: "Masukkan Password terlebih dahulu"
    }).min(8, "Minimal password adalah 8 karakter")
})

export const NewPasswordSchema = z.object({
    password: z.string({
        required_error: "Masukkan Password terlebih dahulu"
    }).min(8, "Minimal password adalah 8 karakter")
})