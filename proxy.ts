/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export function proxy(req: any) {
  const role = req.cookies.get("role")?.value;

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}