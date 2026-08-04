import { api } from "@/lib/axios";

export async function getOrganization(){
        const response = await api.get("/addOrganizations")
        return response.data.message
}