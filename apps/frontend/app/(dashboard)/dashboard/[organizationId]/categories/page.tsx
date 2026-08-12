"use client"

import { DataTable } from "@/components/ui/data-table"
import { api } from "@/lib/axios"



export default async function DashboardLayout(){
    const categories = await api.get("/addCategeories")
    return <div className="flex min-h-screen justify-center items-center">
       
    </div>
}