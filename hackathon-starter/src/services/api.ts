import { fetcher } from "@/lib/fetcher";

/**
 * Generic API client wrapper supporting standard HTTP methods
 */
export const api = {
  get: <T>(url: string, options?: RequestInit) =>
    fetcher<T>(url, { method: "GET", ...options }),
    
  post: <T>(url: string, body?: unknown, options?: RequestInit) =>
    fetcher<T>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
    
  put: <T>(url: string, body?: unknown, options?: RequestInit) =>
    fetcher<T>(url, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
    
  patch: <T>(url: string, body?: unknown, options?: RequestInit) =>
    fetcher<T>(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
    
  delete: <T>(url: string, options?: RequestInit) =>
    fetcher<T>(url, { method: "DELETE", ...options }),
};
