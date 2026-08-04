import { colunms } from "@/app/column";
import { DataTable } from "@/components/ui/data-table";

import { getOrganization } from "@/service/organization";


export default async function Organization(){
        const organization = await getOrganization();
   
    return <div className="min-h-screen flex justify-center items-center p-24">
            <DataTable columns={colunms} data={organization}
            ></DataTable>
    </div>
}