import type { ReactNode } from "react"
import { CustomSelect, type TCustomSelect } from "../atoms/custom-select"

export type TInputWithError = TCustomSelect & {
    error?: string
}

export function CustomSelectWithError(
    {...rest} : TInputWithError
): ReactNode {
    return (
        <div className="flex flex-col gap-2">
            <CustomSelect {...rest} />
            {rest.error ? (
                <h6 className="text-red-600">{rest.error}</h6>
            ) : (<></>)}
        </div>
    )
}