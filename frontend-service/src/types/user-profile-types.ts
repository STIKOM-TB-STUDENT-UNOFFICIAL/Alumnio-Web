export type TUserProfile =  {
    fullname: string,
    email: string,
    phone: string,
    address: string,
    bio: string,
    linkedinUrl?: string,
    profilePict?: string
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