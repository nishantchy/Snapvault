import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// verify JWT token
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || "your-secret-key"
    );
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  // Get user token from cookies
  const userToken = request.cookies.get("token")?.value;

  // Define admin-only routes
  const adminRoutes = [
    "/admin",
    "/admin/dashboard",
    "/admin/users",
    "/admin/memories",
    "/admin/payments",
  ];

  // Check if the current path is an admin route
  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If it's an admin route and no user token exists, redirect to login
  if (isAdminRoute && !userToken) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // If user token exists for admin routes, verify it
  if (isAdminRoute && userToken) {
    try {
      // Verify token
      const payload = await verifyToken(userToken);

      if (!payload) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      // Check if the user exists and is an admin
      const user = await prisma.user.findUnique({
        where: {
          id: payload.id as string,
          role: "ADMIN",
        },
      });

      if (!user) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      // If all checks pass, allow the request
      return NextResponse.next();
    } catch (error) {
      // If token verification fails, redirect to admin login
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // For non-admin routes, continue normally
  return NextResponse.next();
}

// Configure middleware to run on admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
