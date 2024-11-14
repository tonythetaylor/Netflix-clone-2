import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { auth } from "@/auth"

export async function middleware(req: NextRequest) {
    // Check for session token

    // const session = await getServerSession({ req } as any)
  const encryptedToken = req.cookies.get("authjs.session-token")?.value || "";
  const { pathname, origin } = req.nextUrl;

  // Decrypt the token
  const decryptedToken = CryptoJS.AES.decrypt(
    encryptedToken,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY || ""
  ).toString();

  // console.log(decryptedToken)

  const isTokenValid = decodeToken(decryptedToken);

  if (!encryptedToken) {
    // If the token is invalid and user already on the auth page,
    // redirect to /auth
    if (pathname !== "/auth") {
      const loginUrl = new NextURL("/auth", origin);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    // If token is valid and trying to access auth, redirect to dashboard
    if (pathname === "/auth") {
      const dashboardUrl = new NextURL("/profiles", origin);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard route and sub-routes
    "/auth",
    "/",
    "/about/:path",
    "/profiles"
    // Add more routes to protect
  ],
};


// function to decode token validity
function decodeToken(token: string): boolean {
  try {
    const decodedToken = jwt.decode(token) as jwt.JwtPayload;

    if (!decodedToken || !decodedToken.exp) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decodedToken.exp > currentTime;
  } catch (err) {
    console.error("Token decoding error:", err);
    return false;
  }
}