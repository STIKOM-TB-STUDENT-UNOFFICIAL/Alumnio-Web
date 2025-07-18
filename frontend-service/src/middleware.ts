import { redirect, type LoaderFunctionArgs } from "react-router-dom";
import type { TAccess } from "./types/access-types";
import { getSession, sessionDestroy, SessionRole } from "./utils/session";
import { validationSession } from "./services/auth-service";

const Access: TAccess[] = [
    {
        path: "/",
        authorization: []
    },
    {
        path: "/admin/dashboard",
        authorization: [SessionRole.ADMINISTRATOR]
    },
    {
        path: "/admin/dashboard/portfolio",
        authorization: [SessionRole.ADMINISTRATOR]
    },
    {
        path: "/alumni/dashboard",
        authorization: [SessionRole.ALUMNI]
    },
]

export async function Middleware({ request }: LoaderFunctionArgs){
    const path = new URL(request.url).pathname

    const findAccess = Access.find((a) => {
        return a.path == path
    })

    if(!findAccess){
        return null
    }

    if(!getSession() && findAccess.authorization.length == 0){
        return null
    }

    const sessionData = await validationSession(getSession() as string)
    if(!sessionData){
        sessionDestroy()
        return redirect("/")
    }

    if(sessionData && findAccess.authorization.length == 0){
        return redirect(sessionData.role == SessionRole.ADMINISTRATOR ? "/admin/dashboard" : "/alumni/dashboard")
    }

    if(!findAccess.authorization.includes(sessionData.role)){
        return redirect(sessionData.role == SessionRole.ADMINISTRATOR ? "/admin/dashboard" : "/alumni/dashboard")
    }

    return null
}