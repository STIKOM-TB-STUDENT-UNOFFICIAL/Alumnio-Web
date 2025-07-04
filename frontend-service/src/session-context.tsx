import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./libs/context/auth-context";
import { getSession } from "./utils/session";

export default function SessionContext({children}: {children: ReactNode}): ReactNode{
    const [session, setSession] = useState("" as string)

    useEffect(() => {
        if(typeof(getSession()) != "boolean"){
            setSession(getSession() as string)
        }
    }, [])
    
    return (
        <AuthContext.Provider value={{session, setSession}}>
            {children}
        </AuthContext.Provider>
    )
}