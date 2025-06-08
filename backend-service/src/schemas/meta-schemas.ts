import { z } from "zod";

export const MetaSchema = z.object({
    status: z.enum(["SUCCESS", "FAILED"]),
    message: z.string(),
    code: z.number()
})