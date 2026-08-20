
import { api } from "@/lib/axios"
import { getCategorization } from "@/service/categories"



export default async function DashboardLayout(){
    const categories= await getCategorization();
    return <div className="flex min-h-screen justify-center items-center">
     
    </div>
}