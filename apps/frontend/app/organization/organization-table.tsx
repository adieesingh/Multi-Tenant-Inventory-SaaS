"use client";
import { DataTable } from "@/components/ui/data-table";
import { colunms } from "../column";
import { useRouter } from "next/navigation";

export function OrganizationTable({ data }: { data: any[] }) {
  const router = useRouter();
  return (
    <DataTable
     data={data}
      columns={colunms}
      onRowClick={(organization) => {
        router.push(`/dashboard/${organization.id}/categories`);
      }}
     
    ></DataTable>
  );
}
