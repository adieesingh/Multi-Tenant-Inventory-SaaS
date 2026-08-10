import { colunms } from "@/app/column";
import { DataTable } from "@/components/ui/data-table";
import { ToolBar } from "@/components/ui/toolbar";

import { getOrganization } from "@/service/organization";


export default async function Organization(){
        const organization = await getOrganization();
   
    return <div className="min-h-screen bg-gray-50">
        <ToolBar></ToolBar>
            <DataTable columns={colunms} data={organization}
            ></DataTable>
            
    </div>
}