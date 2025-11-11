import { deleteJobOpportunityService, getJobOpportunityService, patchJobOpportunityService, postJobOpportunityService } from "@/services/job-opportunity-service.ts";
import { generateMeta } from "@/utils/generate-meta.ts";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

export async function GetJobOpportunity(c: Context) {
    try {
        const { q } = c.req.query()

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly fetch job opportunity"),
            data: await getJobOpportunityService(q ?? "")
        }

        return c.json(result);
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}

export async function PostJobOpportunity(c: Context) {
    try {
        const body = await c.req.json()
        
        delete body.id
        delete body.postedDate
        delete body.companyLogo

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly post job opportunity"),
            data: await postJobOpportunityService(body)
        }

        return c.json(result);
    } catch {
        throw new HTTPException(400, { message: "Bad Request" });
    }
}

export async function DeleteJobOpportunity(c: Context){
    try {
        const body = await c.req.json()

        await deleteJobOpportunityService(body.id)

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly delete job opportunity"),
            data: []
        }

        return c.json(result);
    } catch (e) {
        console.log(e)
        throw new HTTPException(400, { message: "Bad Request" });
    }
}

export async function PatchJobOpportunity(c: Context) {
    try {
        const body = await c.req.json()
        
        delete body.postedDate
        delete body.companyLogo

        const result = {
            meta: generateMeta("SUCCESS", 200, "Successfuly post job opportunity"),
            data: await patchJobOpportunityService(body)
        }

        return c.json(result);
    } catch (e) {
        console.log(e)
        throw new HTTPException(400, { message: "Bad Request" });
    }
}