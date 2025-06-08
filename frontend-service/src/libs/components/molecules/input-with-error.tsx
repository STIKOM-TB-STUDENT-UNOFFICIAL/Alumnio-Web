import type { ReactNode } from "react"
import { Input, type TCustomInput } from "../atoms/input"

export type TInputWithError = TCustomInput & {
    error?: string
}

export function InputWithError(
    {...rest} : TInputWithError
): ReactNode {
    return (
        <div className="flex flex-col gap-2">
            <Input {...rest} />
            {rest.error ? (
                <h6 className="text-red-600">{rest.error}</h6>
            ) : (<></>)}
        </div>
    )
}