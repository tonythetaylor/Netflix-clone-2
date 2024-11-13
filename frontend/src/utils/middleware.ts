import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { NextURL } from "next/dist/server/web/next-url";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const encryptedToken = req.cookies.get("authToken")?.value || "";
  const { pathname, origin } = req.nextUrl;

  // Decrypt the token
  const decryptedToken = CryptoJS.AES.decrypt(
    encryptedToken,
    process.env.NEXT_PUBLIC_CRYPTOJS_KEY || ""
  ).toString(CryptoJS.enc.Utf8);

  const isTokenValid = decodeToken(decryptedToken);

  if (!isTokenValid) {
    // If the token is invalid and user already on the sign-in page,
    // redirect to /sign-in
    if (pathname !== "/sign-in") {
      const loginUrl = new NextURL("/sign-in", origin);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    // If token is valid and trying to access sign-in, redirect to dashboard
    if (pathname === "/sign-in") {
      const dashboardUrl = new NextURL("/dashboard", origin);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*", // Protect dashboard route and sub-routes
    "/sign-in",
    "/",
    "/about/:path",
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