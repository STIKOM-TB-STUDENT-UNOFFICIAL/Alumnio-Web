import z from "zod";

export const UserProfileSchema = z.object({
    fullname: z.string().min(1, "Fullname tidak boleh kosong !"),
    email: z.string().min(1, "Email tidak boleh kosong !"),
    phone: z.string().min(1, "Phone tidak boleh kosong!"),
    address: z.string(),
    linkedinUrl: z.string(),
    bio: z.string()
})