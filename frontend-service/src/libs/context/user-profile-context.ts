import type { TUserProfile } from "@/types/user-profile-types";
import { createContext } from "react";

export const userProfileContext = createContext({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    linkedinUrl: "",
    profilePict: ""
} as TUserProfile)