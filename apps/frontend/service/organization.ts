import { api } from "@/lib/axios";
import { cookies } from "next/headers";

export async function getOrganization() {
  const cookieStore = await cookies();
  const response = await api.get("/addOrganizations/", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data.message;
}
