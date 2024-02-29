import { createContext, useState } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider(props) {

    const [token, setToken] = useState(null)
    const [isOpen , setOpen] = useState(false)

    return <TokenContext.Provider value={{token,setToken,isOpen,setOpen}}>
{props.children}
    </TokenContext.Provider>
    
}