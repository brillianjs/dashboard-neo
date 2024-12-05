import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export function mainMiddleware(req, next) {
  return NextResponse.next();
}

export default withAuth(mainMiddleware, ["/dashboard"]);
