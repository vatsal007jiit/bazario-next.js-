import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";
import { MiddlewareConfig, NextRequest, NextResponse as res } from "next/server";

export const config : MiddlewareConfig = {
    matcher: [
        "/",
        "/user/:path*",
        "/admin/:path*"
    ]
} 

export const middleware = async (req: NextRequest) =>{
    const session = await getToken({req, secret: process.env.AUTH_SECRET})
    const role = session?.role
    const pathname = req.nextUrl.pathname


    if(( pathname.startsWith("/admin") || pathname.startsWith("/user") ) && !session)
    {
        const url = new URL("/login", req.url)
        return res.redirect(url)
    } 

    if(pathname.startsWith("/admin") && role !== "admin")
    {
        const url = new URL("/login", req.url)
        return res.redirect(url)
    }

    if(pathname.startsWith("/user") && role !== "user")
    {
        const url = new URL("/login", req.url)
        return res.redirect(url)
    }

    if (pathname === "/" && session) 
    {
        if(role=="admin")
        return res.redirect(new URL(`/${role}/products`, req.url));

        return res.redirect(new URL(`/${role}`, req.url));
    }

    return res.next()
}