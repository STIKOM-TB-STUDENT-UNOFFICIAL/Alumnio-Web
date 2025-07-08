import { z } from "zod";
import { MetaSchema } from "./meta-schemas.ts";

export const WorkSchema = z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    title: z.string().min(1, "Title cannot be empty"),
    company: z.string().min(1, "Company cannot be empty"),
    startDate: z.string({required_error: "Required Start Date"}),
    endDate: z.union([
        z.string(),
        z.null()
    ])
})

export const WorkSchemaResponse = z.object({
    meta: MetaSchema,
    data: z.union([
        z.array(WorkSchema),
        z.array(z.any())
    ])
})