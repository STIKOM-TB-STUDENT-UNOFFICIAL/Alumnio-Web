import { z } from "zod";
import { MetaSchema } from "./meta-schemas.ts";

export const MajorSchema = z.object({
    id: z.number().optional(),
    majorName: z.string()
})

export const MajorResponseSchema = z.object({
    meta: MetaSchema,
    data: z.union([
        z.array(MajorSchema),
        z.array(z.unknown())
    ])
})