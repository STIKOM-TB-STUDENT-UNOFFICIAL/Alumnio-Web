import type { TMeta } from "./meta-type"

export type TUserResponse<T> = {
    meta: TMeta,
    data: T
}

export type TUserWithInformation = {
    id?: number,
    userId?: number,
    fullname: string,
    email: string,
    phone: string,
    address: string,
    bio: string,
    classOf: string,
    majorId: number,
    linkedinUrl?: string | null,
    curriculumVitae: string
}

export type TUserWithInformationUpdateable =  {
    fullname: string,
    email: string,
    phone: string,
    address: string,
    bio: string,
    linkedinUrl?: string | null,
}

export type TUser = {
    id?: string,
    username: string,
    password?: string,
    role: number,
    UserInformation: TUserWithInformation | []
}