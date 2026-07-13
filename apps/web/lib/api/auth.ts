import { http } from "./http";
import type { Organization } from "@multi-inv/types";

// Organization signup doubles as tenant creation: Organizations carries its
// own username/password in your schema, so creating one *is* the account.
export interface SignupPayload {
  name: string;
  phoneNumber: string;
  username: string;
  password: string;
  address: string;
}

export function signup(payload: SignupPayload) {
  return http.post<Organization>("/api/addOrganizations", payload);
}

export interface LoginPayload {
  username: string;
  password: string;
}

// ⚠️ ASSUMPTION — your route list didn't include a login endpoint.
// This assumes POST /api/addOrganizations/login sets the session cookie
// and returns the organization. Tell me the real path and I'll swap it in.
export function login(payload: LoginPayload) {
  return http.post<Organization>("/api/addOrganizations/login", payload);
}

// ⚠️ ASSUMPTION — same caveat as login(), swap in your real logout route.
export function logout() {
  return http.post<void>("/api/addOrganizations/logout");
}
