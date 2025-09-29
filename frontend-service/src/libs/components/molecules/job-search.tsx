import type { ReactNode } from "react";
import { Input } from "../atoms/input";
import Button from "../atoms/button";
import { AiOutlineSearch } from "react-icons/ai";

export function JobSearch(): ReactNode {
    return (
        <div className="flex my-5 w-full border dark:border-slate-700 border-blue-50 
                        rounded-lg overflow-hidden shadow-sm p-5 gap-2 items-center bg-clr-surface-tonal-a10-light dark:bg-slate-800">
            <Input 
                type="text"
                placeholder="Search"
                className="w-full border-gray-300"
            />
            <Button>
                <AiOutlineSearch />
            </Button>
        </div>
    )
}