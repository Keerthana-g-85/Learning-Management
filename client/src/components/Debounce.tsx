import { useState , useEffect } from 'react'

export default function useDebounce(value:string){
    const [debounce , setDebounce] = useState<string>('')

    useEffect (()=>{
        const timer = setTimeout(
            ()=>{
                setDebounce(value)
            },1000);
        
            return ()=> clearTimeout(timer)
            
    },[value]);
    return debounce
}