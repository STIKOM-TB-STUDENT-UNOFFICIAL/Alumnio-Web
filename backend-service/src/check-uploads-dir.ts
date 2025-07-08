import { existsSync, mkdirSync } from "fs";

export function setupUploadsDir(){
    if(!existsSync("./uploads")){
        mkdirSync("./uploads")
    }
    if(!existsSync("./uploads/images")){
        mkdirSync("./uploads/images")
    }
    if(!existsSync("./uploads/documents")){
        mkdirSync("./uploads/documents")
    }
}