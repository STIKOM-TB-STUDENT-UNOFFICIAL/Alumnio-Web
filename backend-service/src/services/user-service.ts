import { findMajor, insertMajor } from "@/repositories/majors-repository.ts";
import { findAllUser, findAllUserForPrint, findUserById, hasProfilePict, insertNewUser, patchUserInformation, updateProfilePict, upsertNewUser } from "@/repositories/user-repository.ts";
import type { TUser, TUserWithInformationUpdateable, TXLSXUser } from "@/types/user-type.ts";
import { getExtension } from "@/utils/get-extension.ts";
import { readXLSX } from "@/utils/read-xlsx.ts";
import { toTitleCase } from "@/utils/title-case.ts";
import { generateUuid } from "@/utils/uuid.ts";
import { unlinkSync, writeFileSync } from "fs";

export async function findAllUserService(q: string, take: number, skip: number){
    return (await findAllUser(
        q,
        take,
        skip
    )).map(({password, role, ...rest}) => {
        return {
            ...rest,
            WorkHistory: rest.WorkHistory.map(({id, userId, ...rst}) => rst)
        }
    })
}

export async function findAllUserServicePrint(major: string, q: string, take: number, skip: number){
    return (await findAllUserForPrint(
        major,
        q,
        take,
        skip
    )).map(({password, role, ...rest}) => {
        return {
            ...rest,
            WorkHistory: rest.WorkHistory.map(({id, userId, ...rst}) => rst)
        }
    })
}

export async function findUserByIdService(id: number){
    return await findUserById(id)
}

export async function newUserService(user: TUser){
    return await insertNewUser(user)
}

export async function patchUserService(userId: number, userInformation: TUserWithInformationUpdateable){
    return await patchUserInformation(userId, userInformation)
}

export async function uploadProfilePictService(userId: number, image: globalThis.File){
    const previousProfilePict = await hasProfilePict(userId)
    if(previousProfilePict){
        try{
            unlinkSync(`./uploads/images/${previousProfilePict}`)
        }
        catch(e: unknown){
            console.log(`Error : ${(e as Error).message}`)
        }
    }
    const extension = getExtension((image as File).name)
    const newName = generateUuid()
    const path = `./uploads/images/${newName}.${extension}`
    writeFileSync(path, new Uint8Array(await (image as File).arrayBuffer()))
    await updateProfilePict(userId, `${newName}.${extension}`)
}

export async function xlsUserRegisterService(xlsFile: globalThis.File){
    const json: TXLSXUser[] = await readXLSX(xlsFile) as TXLSXUser[]

    async function setMajor(){
        const major = new Map<string, number>();

        (await findMajor()).map((v) => {
            major.set(v.majorName, v.id)
        })
        return major
    }

    let major = await setMajor()

    const formattedUserPromise: Promise<TUser>[] = json.map(async (v) => {
        if(!major.get(toTitleCase(v.Jurusan))){
            await insertMajor(toTitleCase(v.Jurusan))
            major = await setMajor()
        }

        return {
            username: v.NIM.toString(),
            password: `abc${v.NIM}`,
            role: 1,
            UserInformation: {
                fullname: v.Nama,
                gender: v["Jenis Kelamin"].toUpperCase() == "L" ? "Male" : "Female",
                email: v.Email.toString(),
                phone: v.HP.toString(),
                address: v.Alamat,
                bio: "",
                graduateOf: v["Tahun Lulus"].toString(),
                majorId: major.get(toTitleCase(v.Jurusan))
            }
        } as TUser
    })

    const formattedUser = await Promise.all(formattedUserPromise)
    formattedUser.map((v) => {
        upsertNewUser(v)
    })
}