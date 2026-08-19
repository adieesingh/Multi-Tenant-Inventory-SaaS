"use client"

import { useRouter } from "next/router"

export function useTableNavigation(){
    const router = useRouter()
    const goTo=(path:string)=>{
        router.push(path)
    }
    return {goTo}
}