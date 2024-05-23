import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextRequest } from 'next/server'
import { auth } from './auth'
export default NextAuth(authConfig).auth

export async function middleware(request: NextRequest) {
    const userData = await auth()

    if (!userData && request.nextUrl.pathname.startsWith('/profile')) {
        return Response.redirect(new URL('/', request.url))
    }
    if (!userData && request.nextUrl.pathname.startsWith('/admin')) {
        return Response.redirect(new URL('/', request.url))
    }

    if (
        userData &&
        userData.user.role !== 'admin' &&
        request.nextUrl.pathname.startsWith('/admin')
    ) {
        return Response.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
