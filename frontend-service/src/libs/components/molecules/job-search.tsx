import type { ReactNode } from "react";
import { Input } from "../atoms/input";
import Button from "../atoms/button";
import { AiOutlineSearch } from "react-icons/ai";

export function JobSearch(
    {
        q,
        setQ,
        btnAction
    }:{
        q: string,
        setQ: React.Dispatch<React.SetStateAction<string>>,
        btnAction: () => {}
    }
): ReactNode {
    return (
        <div className="flex my-5 w-full border dark:border-slate-700 border-blue-50 
                        rounded-lg overflow-hidden shadow-sm p-5 gap-2 items-center bg-clr-surface-tonal-a10-light dark:bg-slate-800">
            <Input 
                type="text"
                placeholder="Search"
                className="w-full border-gray-300"
                value={q}
                onChange={(e) => {
                    setQ(e.target.value)
                    if(e.target.value == ""){
                        btnAction()
                    }
                }}
                onKeyDown={(e) => {
                    if(e.key == "Enter"){
                        btnAction()
                    }
                }}
            />
            <Button onClick={() => btnAction()}>
                <AiOutlineSearch />
            </Button>
        </div>
    )
}