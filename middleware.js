import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;

    if (!token) {
      return NextResponse.rewrite(new URL("/unauthorized", req.url), {
        status: 403,
      });
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);


export const config = {
  matcher: ['/properties/add(.*)', '/profile', '/profile/saved', '/messages'],
};