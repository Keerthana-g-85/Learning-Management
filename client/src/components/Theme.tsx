import { useState , createContext, type ReactNode} from 'react'

type Context ={
    theme: "light" | "dark"; 
    setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>; 
}
export const ThemeContext = createContext<Context >({ theme: "light", setTheme: () => {},})
export function Theme ({children}: {children: ReactNode}){
    const [ theme , setTheme] = useState<'light'|'dark'>('light')
    return(
        <>
        <ThemeContext.Provider value ={{theme , setTheme}}>
            { children}
        </ThemeContext.Provider>
        </>
    )
}