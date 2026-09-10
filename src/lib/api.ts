/**
 * Central API client abstraction.
 * Phase 1: scaffold only. Later phases will route mock or REST calls through here.
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export type ApiError = {
  message: string;
  status?: number;
};

export async function apiGet<T>(path: string): Promise<T> {
  // Placeholder — real fetch logic arrives with the service layer (Phase 3+).
  throw new Error(`apiGet not implemented yet: ${path}`);
}
