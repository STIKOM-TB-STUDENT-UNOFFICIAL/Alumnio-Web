import type { TFctx } from "@/types/forgot-types";
import { createContext } from "react";

export const Fctx = createContext({
    fctx: {
        username: "",
        email: "",
        otp: "",
        password: ""
    },
    setFctx: () => {}
} as {
    fctx: TFctx,
    setFctx: React.Dispatch<React.SetStateAction<TFctx>>
})