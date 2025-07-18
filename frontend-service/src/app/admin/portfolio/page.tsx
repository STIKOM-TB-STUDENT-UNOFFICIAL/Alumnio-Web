import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export default function Index(): ReactNode {
    const [searchParams] = useSearchParams()

    return (
        <div className="min-h-[100vh] max-w-[1280px] w-full">
            {searchParams.get("id")}
        </div>
    )
}