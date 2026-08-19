import { colunms } from "@/app/column";
import { InputInline } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { ToolBar } from "@/components/ui/toolbar";

import { getOrganization } from "@/service/organization";
import { useTableNavigation } from "@/service/routerhandler";



export default async function Organization() {
  const organization = await getOrganization();
  const {goTo} = useTableNavigation();
  return (
    <div className="min-h-screen bg-gray-50">
      <ToolBar></ToolBar>
      <div className="w-full p-6">
        <div className="mb-6 flex justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-normal">Organization</h1>
            <p className="text-sm text-muted-foreground">
              Manage your organization
            </p>
          </div>
        
        
          <div className="mb-4">
            <InputInline className="border-4 rounded-sm"></InputInline>
          </div>
        </div>
      </div>
      <div className="overflow-hidden shadow-sm rounded-xl bg-white border">
      <DataTable columns={colunms} 
     onRowClick={(organization)=>{
        goTo(`/dashboard/${organization.id}`)
     }}
      data={organization}></DataTable>
      </div>
    </div>
  );
}
