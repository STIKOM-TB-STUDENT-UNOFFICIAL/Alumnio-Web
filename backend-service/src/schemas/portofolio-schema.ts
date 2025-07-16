import { z } from "zod";

export const PortofolioSchema = z.object({
    id: z.number().optional(),
    userId: z.number().optional(),
    title: z.string(),
    description: z.string(),
    demoUrl: z.string(),
    sourceCode: z.string()
})