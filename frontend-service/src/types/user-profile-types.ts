import type { TWork } from "./work-types"

export type TUserProfile =  {
    fullname: string,
    email: string,
    phone: string,
    address: string,
    bio: string,
    linkedinUrl?: string,
    profilePict?: string
}

export type TMajor = {
    id: number,
    majorName: string
}

export type TUserInformation = {
    UserInformation: TUserProfile & {
        classOf: string,
        major: {
            id: number,
            majorName: string
        },
        curriculumVitae: string,
        profilePict: string,
    },
    WorkHistory: Omit<TWork, "id" | "status">[]
}

export type TUserInformationResponse = {
    success?: false,
    meta: {
        status: "SUCCESS" | "FAILED",
        code: number,
        message: string
    },
    data: TUserInformation[]
}

export type TUserProfileResponse = {
    success?: false,
    meta: {
        status: "SUCCESS" | "FAILED",
        code: number,
        message: string
    },
    data: {
        UserInformation: TUserProfile
    }
}