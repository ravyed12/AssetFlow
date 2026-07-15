import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - Public auth pages: /login, /signup
     * - API routes under /api/auth (if any)
     */
    "/((?!_next/static|_next/image|favicon.ico|login|signup|api/auth).*)",
  ],
};
