import type { TMeta } from "./meta-type.ts"

export type TUserResponse<T> = {
    meta: TMeta,
    data: T
}

export type TUserWithInformation = {
    id?: number,
    userId?: number,
    fullname: string,
    gender?: "Male" | "Female",
    email: string,
    phone: string,
    address: string,
    bio: string,
    graduateOf: string,
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

export type TXLSXUser = {
    NIM: string,
    Nama: string,
    'Jenis Kelamin': 'L' | 'P',
    Email: string,
    HP: string,
    Alamat: string,
    Jurusan: string,
    'Tahun Lulus': string
}