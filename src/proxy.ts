import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

/**
 * Middleware proxy function to enforce route authorization and role-based access control.
 *
 * @param request - The incoming Next.js request object containing request metadata.
 * @returns A `NextResponse` redirecting unauthenticated or unauthorized users,
 *          or passing through to the requested route.
 */
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  // Retrieve current session data to evaluate authentication and role state
  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }

  // Guard Clause 1: Redirect unauthenticated users to the login page
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Guard Clause 2: Redirect admins attempting to access standard dashboard to the admin portal
  if (isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  // Guard Clause 3: Restrict standard users from accessing admin routes
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Proceed to the requested route if all authorization checks pass
  return NextResponse.next();
}

//? from module video
// export const config = {
//   matcher: ["/dashboard"],
// };

//? ai suggestion
export const config = {
  matcher: [
    "/dashboard/:path*", // Protects /dashboard and any nested sub-routes
    "/admin-dashboard/:path*", // Protects /admin-dashboard and any nested sub-routes
  ],
};
