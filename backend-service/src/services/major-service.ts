import { findMajor } from "@/repositories/majors-repository";

export async function getAllMajorService(){
    return await findMajor()
}