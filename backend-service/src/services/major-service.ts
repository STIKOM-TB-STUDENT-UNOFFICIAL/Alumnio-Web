import { findMajor } from "@/repositories/majors-repository.ts";

export async function getAllMajorService(){
    return await findMajor()
}