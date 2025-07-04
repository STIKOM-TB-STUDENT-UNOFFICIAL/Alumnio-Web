import { createContext } from "react";

export const AuthContext = createContext({
    session: null,
    setSession: () => {}
} as {
    session: string | null,
    setSession: React.Dispatch<React.SetStateAction<string>>
});