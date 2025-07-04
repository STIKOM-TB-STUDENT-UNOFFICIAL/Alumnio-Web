import { createContext } from "react";

export const MenuContext = createContext({
    menu: 0,
    setMenu: () => {}
} as {
    menu: number,
    setMenu: React.Dispatch<React.SetStateAction<number>>
});
