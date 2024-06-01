import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextRequest } from 'next/server'
import { auth } from './auth'
import { fetchUserById } from './app/data/users-data'
import { signOut } from 'next-auth/react'
export default NextAuth(authConfig).auth

export async function middleware(request: NextRequest) {
    const userSession = await auth()
    let userData
    if (userSession) userData = await fetchUserById(userSession.user.user_id!)

    if (userSession && !userData) {
        signOut()
        return Response.redirect(new URL('/', request.url))
    }

    if (!userSession && request.nextUrl.pathname.startsWith('/profile')) {
        return Response.redirect(new URL('/', request.url))
    }
    if (!userSession && request.nextUrl.pathname.startsWith('/admin')) {
        return Response.redirect(new URL('/', request.url))
    }

    if (
        userSession &&
        userSession.user.role !== 'admin' &&
        request.nextUrl.pathname.startsWith('/admin')
    ) {
        return Response.redirect(new URL('/', request.url))
    }

    if (!userSession && request.nextUrl.pathname.includes('/book')) {
        return Response.redirect(new URL('/', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
